---
permalink: /data-processing/
redirect_from: /data-processing.html
layout: legal
page_title: "Data Processing & Security Policy"
effective_date: "5 May 2026"
last_updated: "5 May 2026"
title: "Data Processing & Security Policy — Leapath"
description: "Data Processing & Security Policy for the Leapath Placement Intelligence Platform — safeguards, sub-processors, retention, and incident response."
robots: "index, follow"
canonical: "https://www.leapath.tech/data-processing/"
include_legal_jsonld: true
favicon_end_color: "%23F042FF"
---

## 1. Purpose and Scope

This Data Processing & Security Policy (the "**Policy**") describes how Leapath Technology ("**Leapath**") processes personal data on behalf of its institutional and recruiter customers, the safeguards we apply, and the operational practices that support our commitments under the Privacy Policy and Terms of Service.

This Policy supplements, and is incorporated by reference into, any Master Agreement or Data Processing Agreement ("**DPA**") executed between Leapath and a customer. In the event of a conflict, the executed DPA prevails for the customer concerned.

## 2. Definitions

- **Personal Data:** information relating to an identified or identifiable natural person, as defined under applicable data-protection law.
- **Data Controller:** the entity that determines the purposes and means of processing personal data.
- **Data Processor:** the entity that processes personal data on behalf of a Data Controller.
- **Sub-processor:** a third party engaged by Leapath to process personal data on its behalf.
- **Customer:** the institution or recruiter contracting with Leapath for use of the Platform.

## 3. Data Roles and Responsibilities

The allocation of roles depends on the data category and processing context:

- **Customer as Controller, Leapath as Processor:** for student, employee, and recruiter data uploaded or generated within the Customer's tenancy. Leapath processes such data only on documented instructions from the Customer and as necessary to deliver the Platform.
- **Leapath as Controller:** for account administrator data, billing contacts, audit logs of Leapath personnel, security telemetry, and aggregated, de-identified data used for product improvement and benchmarking.
- **Joint determinations:** where the parties jointly determine certain processing activities, responsibilities are allocated as set out in the applicable DPA.

Customers are responsible for ensuring that they have a lawful basis for sharing personal data with Leapath, for issuing necessary notices to data subjects, and for managing data-subject requests in respect of data within their tenancy.

## 4. Purposes of Processing

Leapath processes personal data for the following purposes:

- Operating skill assessment, readiness scoring, profile verification, employer-matching, and analytics features.
- Authenticating users, enforcing access controls, and securing the Platform.
- Generating institution-level dashboards and aggregated reports.
- Providing technical support, diagnosing incidents, and maintaining service quality.
- Complying with legal, regulatory, and contractual obligations.
- Improving the Platform through analysis of de-identified or aggregated data.

Leapath does not process personal data for purposes inconsistent with the Customer's documented instructions or applicable law.

## 5. Data Minimisation

Leapath collects and processes only the personal data necessary for the relevant purpose. Optional fields are clearly identified, default configurations favour the least permissive setting, and assessment data is structured to capture skill signals rather than unnecessary personal detail.

Where institutional features can be delivered using aggregated or de-identified data, we default to those configurations.

## 6. Security Practices

Leapath implements reasonable administrative, technical, and physical safeguards aligned with prevailing industry practice and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. These safeguards include the measures set out below.

### 6.1 Encryption

- Data in transit between user devices and the Platform is protected using current industry-standard transport encryption (TLS).
- Data at rest in primary databases and object storage is encrypted using strong, industry-recognised algorithms.
- Cryptographic keys are managed through a controlled key-management process with restricted access.

### 6.2 Access Control

- Role-based access control governs both Customer-facing permissions and internal administrative access.
- Production access by Leapath personnel is restricted to a need-to-know basis, granted under documented approvals, and revoked upon role change or departure.
- Multi-factor authentication is enforced for privileged internal accounts and is available for Customer accounts where supported by the Customer's identity configuration.
- Strong password policies and session-management controls are applied across the Platform.

### 6.3 Network and Infrastructure Security

- The Platform is hosted on reputable cloud infrastructure with established security certifications.
- Production environments are segregated from development and staging environments.
- Network controls, including firewalls and security groups, restrict ingress and egress to required services only.
- Vulnerability scanning and dependency monitoring are performed on a regular cadence.

### 6.4 Application Security

- Secure development practices are followed, including code review, secret-scanning, and automated testing.
- Inputs are validated and parameterised to mitigate common injection and abuse classes.
- Idempotency, audit logging, and event-ordering controls are applied to critical processing pipelines.

### 6.5 Audit Logging and Monitoring

- Security-relevant events, including authentication, privileged actions, and configuration changes, are logged.
- Logs are retained for a defined period sufficient for incident investigation and compliance purposes, and are protected against unauthorised modification.
- Operational monitoring and alerting are in place for availability, error rates, and selected security indicators.

### 6.6 Personnel Security

- Leapath personnel with access to personal data are bound by written confidentiality obligations.
- Security and privacy training is provided at onboarding and on an ongoing basis.
- Access is reviewed periodically and adjusted in response to role changes.

## 7. Data Isolation and Tenancy

Customer data is logically isolated at the institution level through tenancy identifiers, scoped queries, and access policies. Authorised users of one institution are not granted visibility into the data of another institution, except in the form of aggregated, de-identified benchmarks where the Customer has opted in.

Where shared services are used, controls are applied to prevent unauthorised cross-tenant data access.

## 8. Sub-processors

Leapath engages a limited set of third-party sub-processors to provide cloud infrastructure, hosting, email delivery, analytics, observability, and support services. Sub-processors are selected based on their security posture and contractual willingness to commit to obligations consistent with this Policy.

Each sub-processor is bound by a written agreement that requires:

- Processing personal data only as instructed and for defined purposes;
- Maintaining appropriate technical and organisational measures;
- Confidentiality obligations on personnel;
- Cooperation with Leapath's audit and incident-response obligations.

An up-to-date list of material sub-processors is available to Customers upon request through [privacy@leapath.tech](mailto:info@leapath.tech). Customers may receive notice of material changes to the sub-processor list as set out in the applicable DPA.

## 9. International Data Transfers

Personal data is primarily hosted in data-centre regions located in or proximate to India. Where processing or sub-processing involves transfers to other jurisdictions, Leapath relies on safeguards consistent with applicable law, including contractual protections that require comparable levels of data protection.

## 10. Incident and Breach Response

Leapath maintains a documented incident-response process designed to detect, contain, investigate, and remediate security incidents.

- Suspected incidents are triaged by designated personnel against defined severity criteria.
- Containment and forensic measures are initiated promptly upon confirmation of an incident.
- Where a personal-data breach is confirmed and is likely to affect a Customer's data, Leapath will notify the affected Customer without undue delay, in accordance with applicable law and the relevant DPA, and will provide information reasonably necessary to enable the Customer to meet its own notification obligations.
- Post-incident review is conducted to identify root causes and preventive measures.

Customers and Users may report suspected security issues to [security@leapath.tech](mailto:info@leapath.tech).

## 11. Data Retention and Deletion

Retention periods are aligned with the purposes set out in the Privacy Policy and the Customer's contractual configuration. The default retention practices are as follows:

- Active tenancy data is retained for the duration of the Customer's subscription.
- Following expiry or termination, Customer data is retained for a defined wind-down period to permit export and transition, after which it is deleted or anonymised in accordance with the applicable DPA.
- Audit logs and security telemetry are retained for periods consistent with operational and compliance requirements.
- De-identified or aggregated data may be retained beyond these periods for analytics, research, and product improvement, where re-identification is not reasonably possible.

Customers may request export or deletion of tenancy data in accordance with the Master Agreement or DPA. Deletion is performed using methods designed to render data unrecoverable through ordinary means, subject to retention required by law.

## 12. Data Subject Requests

Where Leapath acts as a Processor, requests from data subjects are routed to the relevant Customer, who is responsible for responding. Leapath provides reasonable assistance to Customers in fulfilling valid requests, including access, correction, deletion, and objection, taking into account the nature of the processing and the information available.

Where Leapath acts as a Controller, requests may be addressed to [privacy@leapath.tech](mailto:info@leapath.tech) and are handled in accordance with the Privacy Policy.

## 13. Audits and Assurance

Leapath maintains internal documentation of its security controls and is willing to discuss its security posture with Customers under appropriate confidentiality terms. Audit rights, including the scope, frequency, and conduct of audits, are set out in the applicable DPA and are exercised in a manner that does not unreasonably disrupt Leapath's operations or compromise the confidentiality of other Customers.

## 14. Continuous Improvement

Security and privacy practices evolve. Leapath periodically reviews and updates its controls in response to threat developments, technology changes, regulatory updates, and lessons learned from operational experience. Material updates to this Policy will be communicated through the Platform or to institutional administrators.

## 15. Contact

For questions concerning data processing or security matters:

- **Privacy and Data Protection:** [privacy@leapath.tech](mailto:info@leapath.tech)
- **Security and Incident Reporting:** [security@leapath.tech](mailto:info@leapath.tech)
- **Grievance Officer:** [grievance@leapath.tech](mailto:info@leapath.tech)
- **Website:** [https://www.leapath.tech](https://www.leapath.tech)
