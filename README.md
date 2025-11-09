# 🏭 Warehouse Management System

Profesjonalny system zarządzania magazynem/magazynami stworzony w architekturze Clean Architecture z wykorzystaniem najnowszych technologii .NET i React.

## 🚀 Technologie

### Backend
- **.NET 9.0** - Web API
- **PostgreSQL** - Baza danych (AdventureWorks)
- **Entity Framework Core 9.0.4** - ORM
- **Npgsql 9.0.4** - Provider dla PostgreSQL
- **MediatR 13.1.0** - CQRS pattern
- **AutoMapper 12.0.1** - Mapowanie obiektów
- **FluentValidation 12.1.0** - Walidacja
- **Serilog.AspNetCore 9.0.0** - Logowanie
- **Swashbuckle 9.0.6** - Dokumentacja API (Swagger)

### Frontend
- **React 19.1.1** - UI Framework
- **TypeScript** - Typowanie
- **Vite** - Build tool
- **React Router DOM 7.9.5** - Routing
- **Axios 1.13.2** - HTTP client
- **Zustand 5.0.8** - State management
- **React Hook Form 7.66.0** - Formularze
- **Zod 4.1.12** - Walidacja schematów
- **TailwindCSS** - Stylowanie

### Baza danych
- **AdventureWorks for PostgreSQL** - Przykładowa baza danych

## 📋 Funkcjonalności

- 🔄 W trakcie rozwoju...

## 🛠️ Instalacja

### Wymagania
- .NET 9.0 SDK
- Node.js 18+
- PostgreSQL 14+
- AdventureWorks Database

### Backend
```bash
cd warehouse-management/backend/Warehouse.Api
dotnet restore
dotnet run
```

### Frontend
```bash
cd warehouse-management/frontend/warehouse-frontend
npm install
npm run dev
```

## 🎯 Uruchomienie

1. **Baza danych**: PostgreSQL na `localhost:5432`
2. **Backend**: `http://localhost:5204`
3. **Frontend**: `http://localhost:3000`

## 📝 Licencja

MIT