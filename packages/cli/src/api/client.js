const axios = require('axios');

/**
 * Clarity API Client
 * 
 * Handles communication with the Clarity backend API
 */
class ClarityClient {
  constructor(options = {}) {
    this.baseUrl = options.url || process.env.CLARITY_API_URL || 'http://localhost:3000';
    this.licenseKey = options.licenseKey || process.env.CLARITY_LICENSE_KEY;
    
    if (!this.licenseKey) {
      throw new Error('License key is required. Provide via --license flag or CLARITY_LICENSE_KEY environment variable.');
    }
    
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': this.licenseKey
      },
      timeout: 30000
    });
  }
  
  /**
   * Create or update an artifact
   */
  async createArtifact(artifact) {
    try {
      const response = await this.client.post('/api/metadata/artifact', artifact);
      return response.data;
    } catch (error) {
      throw this._handleError('create artifact', error);
    }
  }
  
  /**
   * Upload test results
   */
  async uploadTestResults(data) {
    try {
      const response = await this.client.post('/api/metadata/test-results', data);
      return response.data;
    } catch (error) {
      throw this._handleError('upload test results', error);
    }
  }
  
  /**
   * Upload code coverage
   */
  async uploadCoverage(data) {
    try {
      const response = await this.client.post('/api/metadata/coverage', data);
      return response.data;
    } catch (error) {
      throw this._handleError('upload coverage', error);
    }
  }
  
  /**
   * Record build metadata
   */
  async recordBuild(data) {
    try {
      const response = await this.client.post('/api/metadata/build', data);
      return response.data;
    } catch (error) {
      throw this._handleError('record build', error);
    }
  }
  
  /**
   * Query artifacts
   */
  async queryArtifacts(filters = {}) {
    try {
      const response = await this.client.get('/api/metadata/artifacts', { params: filters });
      return response.data;
    } catch (error) {
      throw this._handleError('query artifacts', error);
    }
  }
  
  /**
   * Get artifact relationship graph
   */
  async getArtifactGraph(fromType, fromIdentifier, depth = 3) {
    try {
      const response = await this.client.get('/api/metadata/graph', {
        params: { fromType, fromIdentifier, depth }
      });
      return response.data;
    } catch (error) {
      throw this._handleError('get artifact graph', error);
    }
  }
  
  /**
   * Handle API errors
   */
  _handleError(action, error) {
    if (error.response) {
      // Server responded with error
      const status = error.response.status;
      const message = error.response.data?.error || error.response.statusText;
      
      if (status === 401 || status === 403) {
        return new Error(`License validation failed: ${message}`);
      }
      
      return new Error(`Failed to ${action}: ${message}`);
    } else if (error.request) {
      // No response received
      return new Error(`Failed to ${action}: No response from server (${this.baseUrl})`);
    } else {
      // Request setup error
      return new Error(`Failed to ${action}: ${error.message}`);
    }
  }
}

module.exports = ClarityClient;
