# 📚 GUÍA DE DESPLIEGUE - GitHub y Hosting

## 🔗 1. Crear Repositorio en GitHub

### Pasos:

1. **Ve a GitHub** → [https://github.com/new](https://github.com/new)

2. **Crea un nuevo repositorio:**
   - **Repository name:** `ecommerce-belleza` (o el nombre que prefieras)
   - **Description:** "Tienda online de belleza y cuidado personal - Proyecto HTML5, SCSS y JavaScript"
   - **Visibility:** Public
   - **NO inicializar con README** (ya tenemos uno)

3. **Después de crear, en tu terminal:**

```bash
cd c:\Users\Admin\e-commerce

# Si no está configurado aún
git config user.name "Tu Nombre"
git config user.email "tu.email@ejemplo.com"

# Ver la URL del repositorio (IMPORTANT - cópiala de GitHub)
git remote -v

# Si no está configurado el remoto:
git remote add origin https://github.com/TU_USUARIO/ecommerce-belleza.git

# Renombrar rama principal a main (si es necesario)
git branch -M main

# Hacer push al repositorio
git push -u origin main
```

---

## 🚀 2. Desplegar en VERCEL (Recomendado - MÁS FÁCIL)

### Ventajas:
- ✅ Deployment automático en cada push a GitHub
- ✅ Certificado SSL gratis
- ✅ Sin configuración complicada
- ✅ Gratis para proyectos públicos

### Pasos:

1. **Ve a Vercel** → [https://vercel.com/](https://vercel.com/)

2. **Sign Up** con tu cuenta de GitHub

3. **Autoriza Vercel** para acceder a tu GitHub

4. **Importar Proyecto:**
   - Click en "New Project"
   - Selecciona tu repositorio `ecommerce-belleza`
   - Vercel detectará automáticamente que es un proyecto estático
   - Click en "Deploy"

5. **¡Listo!** Tu sitio estará en:
   ```
   https://ecommerce-belleza.vercel.app
   ```

### Para actualizaciones automáticas:
- Cada vez que hagas `git push`, Vercel desplegará automáticamente

---

## 🌐 3. Desplegar en NETLIFY (Alternativa)

### Pasos:

1. **Ve a Netlify** → [https://app.netlify.com/](https://app.netlify.com/)

2. **Sign Up** con GitHub

3. **Autoriza Netlify**

4. **Crear Nuevo Sitio:**
   - Click en "Add new site"
   - Selecciona "Import an existing project"
   - Elige tu repositorio
   - Siguiente

5. **Configuración Build (puedes dejar por defecto)**

6. **Deploy Site** ¡Listo!

Tu sitio estará en:
```
https://tuproyecto.netlify.app
```

---

## 📦 4. Desplegar en Firebase Hosting (Alternativa 2)

Firebase ya está parcialmente configurado en tu proyecto.

### Pasos:

1. **Instalar Firebase CLI:**
```bash
npm install -g firebase-tools
```

2. **Login a Firebase:**
```bash
firebase login
```

3. **Inicializar Firebase (si aún no):**
```bash
firebase init hosting
```

4. **Configurar:**
   - Selecciona tu proyecto Firebase
   - Public directory: `.` (raíz)
   - Single-page app: `No`
   - Overwrite index.html: `No`

5. **Deploy:**
```bash
firebase deploy
```

Tu sitio estará en:
```
https://tu-proyecto.firebaseapp.com
```

---

## 📝 5. Pasos Finales Recomendados

### Después de desplegar:

1. **Actualiza el README** con tu URL:
   ```markdown
   ## 🌐 Sitio Publicado
   - **Vercel:** https://ecommerce-belleza.vercel.app
   - **GitHub:** https://github.com/tu-usuario/ecommerce-belleza
   ```

2. **Haz nuevo commit:**
   ```bash
   git add README.md
   git commit -m "docs: add deployment links"
   git push
   ```

3. **Verifica que todo funcione:**
   - [ ] El sitio carga correctamente
   - [ ] El menú se abre/cierra
   - [ ] El carrito funciona
   - [ ] Los estilos se ven bien
   - [ ] Es responsivo en móvil

---

## 🎯 RESUMEN - Lo que Necesitas Hacer

### Orden de pasos (5 minutos):

1. **Crear repo en GitHub** ✅
   ```bash
   git remote add origin https://github.com/TU_USUARIO/ecommerce-belleza.git
   git push -u origin main
   ```

2. **Desplegar en Vercel** ✅
   - Ve a https://vercel.com
   - Conecta tu GitHub
   - Selecciona el repo
   - Deploy automático ✨

3. **Compartir links:**
   - 📌 GitHub: `https://github.com/tu-usuario/ecommerce-belleza`
   - 🚀 Sitio: `https://ecommerce-belleza.vercel.app`

---

## 🔧 Troubleshooting

### Si Vercel dice "Build Error":
```bash
# Instala dependencias localmente
npm install

# Compila SCSS
npm run sass:build

# Verifica que dist/css/main.css existe
```

### Si las imágenes no cargan:
- Verifica que existan en `src/assets/img/`
- Las rutas en HTML deben ser: `./src/assets/img/...`

### Si el sitio no funciona en producción:
- Abre DevTools (F12)
- Ve a la pestaña Console
- Busca errores rojo
- Verifica rutas de archivos

---

## ✅ Checklist Final

- [ ] Repositorio en GitHub creado
- [ ] Código hecho push a GitHub
- [ ] Despliegue en Vercel/Netlify realizado
- [ ] Sitio en vivo y funcional
- [ ] Menú lateral funciona
- [ ] Carrito funciona y persiste
- [ ] Responsivo en móvil
- [ ] README actualizado con links
- [ ] Links enviados para evaluación

---

¡LISTO! Tu proyecto ahora es profesional y está en vivo 🎉
