# Fleet Telemetry 

![CI Pipeline](https://github.com/YourUsername/fleet-telemetry-api/actions/workflows/ci.yml/badge.svg)

##  Overview
 Fleet Telemetry  is a backend system designed to ingest, process, and analyze high-volume streaming data from IoT sensors in connected vehicles. 

It acts as the "digital brain" for fleet management, securely receiving continuous GPS and engine diagnostics, evaluating the data against custom business rules in real-time, and generating actionable alerts for fleet operators.

##  Key Features
* **High-Volume Data Ingestion:** Robust Express.js pipeline designed to handle continuous streaming JSON payloads from multiple vehicles simultaneously.
* **Decoupled Rule Engine:** Asynchronous processing system that evaluates incoming telemetry to instantly detect geofence violations, speeding, and critical hardware failures (e.g., low fuel).
* **Automated Quality Gate (CI/CD):** Fully integrated GitHub Actions pipeline that runs a comprehensive Jest/Supertest suite on every push, ensuring zero regressions.
* **Rigorous Validation:** Strict payload validation using Joi to reject corrupted or malicious IoT data at the boundary layer.
* **Role-Based Security:** JWT authentication middleware protecting query endpoints, ensuring only authorized fleet operators can access vehicle data.
* **Cloud Persistence:** Seamless integration with MongoDB Atlas for scalable, persistent storage of telemetry logs and generated alerts.

## Technology Stack
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas, Mongoose
* **Quality & Testing:** Jest, Supertest (Functional & Negative Testing)
* **Security & Validation:** JSON Web Tokens (JWT), Joi
* **CI/CD:** GitHub Actions

---

##  Getting Started

### 1. Clone the Repository
```bash
git clone [https://github.com/YourUsername/Fleet-Telemetry.git](https://github.com/YourUsername/Fleet-Telemetry.git)
cd Fleet-Telemetry
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Environment Setup
```bash
PORT=3000
NODE_ENV=development
MONGO_URI=
JWT_SECRET=
```
### 4. Run the Server
```bash
npm run dev
```
### 5. Running the Fleet Simulator
```bash
node simulator/simulate.js
```
---

## API Documentation

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/login` | Authenticate as admin to receive JWT token | No |

### Telemetry Ingestion (IoT Devices)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/telemetry` | Ingest live vehicle telemetry data | No |

### Fleet Operator Queries
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/alerts/:vehicleId` | Fetch triggered rule violations (speeding, fuel) | Yes (JWT) |
| `GET` | `/api/telemetry/:vehicleId` | Fetch raw historical telemetry logs | Yes (JWT) |

---

## Testing Suite

### 1. Run the test suite locally
```bash
npm test
```
### 2.Run the CI-ready test suite
```bash
npm run test:ci
```