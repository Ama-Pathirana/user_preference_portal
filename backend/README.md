# Django Backend

This is the backend service built with Django and Django REST Framework.

## 🚀 Getting Started

Follow these steps to set up the backend locally.

### 1. Clone the Repository

```bash
git clone https://github.com/https://github.com/Ama-Pathirana/user_preference_portal
cd your-backend-repo
```

### 2. Create and Activate a Virtual Environment

```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies

Install all required Python packages using `requirements.txt`:

```bash
pip install -r requirements.txt
```

### 4. Apply Migrations

```bash
python manage.py migrate
```

### 5. Run the Development Server

```bash
python manage.py runserver
```

The backend will be available at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 🛠 Tech Stack

- Python
- Django
- Django REST Framework

## 📁 Project Structure

```
your-backend-repo/
├── manage.py
├── your_project_name/
│   ├── settings.py
│   ├── urls.py
│   └── ...
├── requirements.txt
└── README.md
```

---

## 📝 Notes

- Make sure Python 3.8+ is installed.
- Always activate the virtual environment before running or modifying the project.
