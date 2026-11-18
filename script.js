
// Бургер-меню
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // Подсветка активного пункта меню
  var links = document.querySelectorAll('.nav a');
  var path = location.pathname.split('/').pop() || 'index.html';
  links.forEach(function (a) {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // Фильтр портфолио
  var filterBtns = document.querySelectorAll('.filters button');
  var tiles = document.querySelectorAll('.tile[data-cat]');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.dataset.filter;
      tiles.forEach(function (t) {
        t.style.display = (cat === 'all' || t.dataset.cat === cat) ? 'flex' : 'none';
      });
    });
  });

  // Валидация формы записи
  var form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;

      var name = form.elements['name'];
      var errName = document.getElementById('errName');
      if (name.value.trim().length < 2) { errName.classList.add('show'); ok = false; }
      else errName.classList.remove('show');

      var phone = form.elements['phone'];
      var errPhone = document.getElementById('errPhone');
      var phoneRe = /^[\d\s()+-]{10,18}$/;
      if (!phoneRe.test(phone.value.trim())) { errPhone.classList.add('show'); ok = false; }
      else errPhone.classList.remove('show');

      var email = form.elements['email'];
      var errEmail = document.getElementById('errEmail');
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (email.value && !emailRe.test(email.value.trim())) { errEmail.classList.add('show'); ok = false; }
      else errEmail.classList.remove('show');

      var date = form.elements['date'];
      var errDate = document.getElementById('errDate');
      var today = new Date().toISOString().slice(0, 10);
      if (!date.value || date.value < today) { errDate.classList.add('show'); ok = false; }
      else errDate.classList.remove('show');

      if (ok) {
        var data = new FormData(form);
        console.log('Заявка отправлена:', Object.fromEntries(data));
        // Точка расширения: здесь можно отправить данные на сервер:
        // fetch('/api/booking', { method: 'POST', body: data });
        document.getElementById('success').classList.add('show');
        form.reset();
      } else {
        document.getElementById('success').classList.remove('show');
      }
    });
  }
});
