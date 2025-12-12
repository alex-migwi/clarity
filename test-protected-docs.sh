#!/bin/bash
# Automated tests for Protected Documentation middleware

set -e

BACKEND_URL="http://localhost:3000"
FRONTEND_URL="http://localhost:4321"
BASE_PATH="/clarity-docs"

echo "======================================"
echo "Protected Documentation Tests"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

pass_count=0
fail_count=0

# Test function
test_case() {
    local test_name=$1
    local result=$2
    
    if [ "$result" = "0" ]; then
        echo -e "${GREEN}✓ PASS${NC}: $test_name"
        ((pass_count++))
    else
        echo -e "${RED}✗ FAIL${NC}: $test_name"
        ((fail_count++))
    fi
}

echo "Waiting for servers to be ready..."
sleep 2

# Test 1: Backend /auth/user endpoint (unauthenticated)
echo ""
echo "Test 1: Backend session check (unauthenticated)"
response=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/auth/user")
if [ "$response" = "401" ]; then
    test_case "Backend returns 401 for unauthenticated request" 0
else
    test_case "Backend returns 401 for unauthenticated request (got $response)" 1
fi

# Test 2: Backend is running and accepting requests
echo ""
echo "Test 2: Backend server health"
response=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/auth/user")
if [ "$response" != "000" ]; then
    test_case "Backend server is accessible" 0
else
    test_case "Backend server is accessible" 1
fi

# Test 3: Check if frontend server is running
echo ""
echo "Test 3: Frontend server health"
response=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL$BASE_PATH/")
if [ "$response" = "200" ]; then
    test_case "Frontend server is accessible" 0
else
    test_case "Frontend server is accessible (got $response)" 1
    echo -e "${YELLOW}Note: Frontend may still be starting...${NC}"
fi

# Test 4: Public page is accessible (introduction)
echo ""
echo "Test 4: Public page access"
response=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL$BASE_PATH/docs/introduction")
if [ "$response" = "200" ]; then
    test_case "Public page /docs/introduction is accessible" 0
else
    test_case "Public page /docs/introduction is accessible (got $response)" 1
fi

# Test 5: Protected page redirects (team-docs)
echo ""
echo "Test 5: Protected page redirect"
response=$(curl -s -o /dev/null -w "%{http_code}" -L "$FRONTEND_URL$BASE_PATH/docs/guides/team-docs")
redirect_location=$(curl -s -I "$FRONTEND_URL$BASE_PATH/docs/guides/team-docs" | grep -i "location:" || echo "")

if [[ "$redirect_location" == *"login"* ]]; then
    test_case "Protected page redirects to login" 0
else
    # Could be 302, 301, or 200 if already at login
    if [ "$response" = "302" ] || [ "$response" = "301" ] || [[ "$redirect_location" == *"login"* ]]; then
        test_case "Protected page triggers redirect" 0
    else
        test_case "Protected page redirects to login (got $response, location: $redirect_location)" 1
    fi
fi

# Test 6: Protected internal folder
echo ""
echo "Test 6: Folder-level protection (/docs/internal/)"
response=$(curl -s -o /dev/null -w "%{http_code}" -L "$FRONTEND_URL$BASE_PATH/docs/internal/security")
redirect_location=$(curl -s -I "$FRONTEND_URL$BASE_PATH/docs/internal/security" | grep -i "location:" || echo "")

if [[ "$redirect_location" == *"login"* ]] || [ "$response" = "302" ] || [ "$response" = "301" ]; then
    test_case "Internal folder pages are protected" 0
else
    test_case "Internal folder pages are protected (got $response)" 1
fi

# Test 7: Middleware file exists
echo ""
echo "Test 7: Middleware implementation"
if [ -f "src/middleware/index.ts" ]; then
    test_case "Middleware file exists" 0
else
    test_case "Middleware file exists" 1
fi

# Test 8: Content schema has protected field
echo ""
echo "Test 8: Content schema updated"
if grep -q "protected" "src/content/config.ts"; then
    test_case "Content schema includes 'protected' field" 0
else
    test_case "Content schema includes 'protected' field" 1
fi

# Test 9: Protected test pages exist
echo ""
echo "Test 9: Test content created"
test_count=0
test_pass=0

if [ -f "src/content/docs/guides/team-docs.md" ]; then ((test_pass++)); fi
if [ -f "src/content/docs/internal/index.md" ]; then ((test_pass++)); fi
if [ -f "src/content/docs/internal/security.md" ]; then ((test_pass++)); fi

if [ "$test_pass" = "3" ]; then
    test_case "All protected test pages created (3/3)" 0
else
    test_case "All protected test pages created ($test_pass/3)" 1
fi

# Summary
echo ""
echo "======================================"
echo "Test Summary"
echo "======================================"
echo -e "${GREEN}Passed: $pass_count${NC}"
echo -e "${RED}Failed: $fail_count${NC}"
echo ""

if [ "$fail_count" = "0" ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Open browser in incognito mode"
    echo "2. Navigate to: $FRONTEND_URL$BASE_PATH/docs/guides/team-docs"
    echo "3. Verify redirect to login page with ?redirect parameter"
    echo "4. Complete OAuth flow to test end-to-end authentication"
    exit 0
else
    echo -e "${RED}✗ Some tests failed${NC}"
    echo ""
    echo "Please check:"
    echo "1. Both servers are running (backend on :3000, frontend on :4321)"
    echo "2. No build errors in the frontend"
    echo "3. Middleware is correctly configured"
    exit 1
fi
