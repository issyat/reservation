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
- Docker and Docker Compose (for containerized development)
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)
- PostgreSQL 14+ (handled by Docker)

### Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd reservation
```

2. Setup environment files:
```bash
# Frontend environment
cp frontend/.env.example frontend/.env.development

# Backend environment (if needed)
cp backend/.env.example backend/.env
```

3. Start the development environment:
```bash
# Start all services
docker-compose up

# Or start in detached mode
docker-compose up -d
```

3. Access the applications:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Database: localhost:5432

### Local Development

There are two ways to run the project:

#### 1. Using Docker (Recommended)
```bash
# Start all services
docker-compose up

# Or start services separately
docker-compose up db        # Start only database
docker-compose up backend   # Start only backend
docker-compose up frontend  # Start only frontend
```

#### 2. Running Locally (Without Docker)

First, start the PostgreSQL database using Docker:
```bash
docker-compose up db
```

Then start the backend:
```bash
cd backend
python -m venv venv                  # Create virtual environment
.\venv\Scripts\Activate.ps1         # Activate virtual environment (Windows)
pip install -r requirements.txt      # Install dependencies
python manage.py migrate            # Run migrations
python manage.py runserver          # Start server
```

Finally, start the frontend:
```bash
cd frontend
npm install                # Install dependencies
npm run dev               # Start development server
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
