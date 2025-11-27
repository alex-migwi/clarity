---
title: BNPL Application
description: Documentation for the Buy Now, Pay Later (BNPL) application.
order: 1
---

## Buy Now, Pay Later (BNPL) Application

This document provides an overview of the BNPL application, its architecture, and key processes.

### High-Level Architecture

The following diagram illustrates the high-level architecture of the BNPL application.

```mermaid
graph TD
    A[Customer] -->|Places Order| B(E-commerce Store);
    B -->|Initiates Payment| C(BNPL Provider);
    C -->|Verifies Customer| D(Credit Check Service);
    D -->|Returns Score| C;
    C -->|Approves/Rejects| B;
    B -->|Confirms Order| A;
    C -->|Pays Merchant| B;
    A -->|Makes Installments| C;
```

### Key Processes

- **Customer Onboarding**: New customers are registered and their creditworthiness is assessed.
- **Loan Origination**: When a customer makes a purchase, a new loan is created.
- **Payment Processing**: Installment payments are collected from the customer.
- **Merchant Settlement**: The e-commerce merchant is paid for the purchase.
