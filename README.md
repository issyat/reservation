# Reservation System

A full-stack reservation management system built with Django REST API backend and React TypeScript frontend.

## Project Structure

```
├── backend/          # Django REST API
├── frontend/         # React TypeScript App
├── .github/          # GitHub Actions CI/CD
└── docker-compose.yml # Development setup
```

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

### Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd reservation
```

2. Start the development environment:
```bash
docker-compose up -d
```

3. Access the applications:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Database: localhost:5432

### Local Development

#### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Features

- **Backend**: Django REST Framework API
- **Frontend**: React with TypeScript and Material-UI
- **Database**: PostgreSQL
- **Testing**: Jest (Frontend) + Django Tests (Backend)
- **CI/CD**: GitHub Actions with auto-approval
- **Containerization**: Docker with multi-stage builds

## API Endpoints

- `GET /api/reservations/` - List all reservations
- `POST /api/reservations/` - Create new reservation
- `GET /api/reservations/{id}/` - Get specific reservation
- `PUT /api/reservations/{id}/` - Update reservation
- `DELETE /api/reservations/{id}/` - Delete reservation

## Development Workflow

1. Create feature branch from `dev`
2. Make changes and commit
3. Push branch and create Pull Request to `dev`
4. CI pipeline runs automatically:
   - Backend tests and Docker build
   - Frontend tests and build
   - Full stack integration test
   - Auto-approval (if all checks pass)

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Backend
cp backend/.env.example backend/.env
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a Pull Request
