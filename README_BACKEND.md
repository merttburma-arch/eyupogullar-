# Eyüboğulları İnşaat Backend API

## Kurulum

1. Backend klasörüne gidin:
```bash
cd backend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Sunucuyu başlatın:
```bash
npm start
```

Sunucu `http://localhost:5000` adresinde çalışacaktır.

## Admin Panel Erişimi

- URL: `http://localhost:3000/admin` (React frontend çalışırken)
- Kullanıcı Adı: `admin`
- Şifre: `admin123`

## API Endpoint'leri

### Authentication
- `POST /api/login` - Admin girişi
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```

### Price List
- `GET /api/prices` - Fiyat listesini getir
- `PUT /api/prices` - Fiyat listesini güncelle (JWT token gerekli)

## Veri Yapısı

Fiyat listesi JSON formatında saklanır:
```json
{
  "basePrices": {
    "p8": 24500,
    "p10": 24200,
    "p12": 23900
  },
  "districts": [
    {
      "name": "Esenyurt",
      "cost": 0
    }
  ],
  "lastUpdated": "2024-02-14T13:39:00.000Z"
}
```

## Güvenlik

- JWT token ile authentication
- Şifreler bcrypt ile hash'lenir
- Sadece admin kullanıcıları fiyat güncelleyebilir
