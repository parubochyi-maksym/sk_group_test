let current = 0;
let tabs = $('.tab');
let tabs_pill = $('.tab-pills');

loadFormData(current);

function loadFormData(n) {
  $(tabs_pill[n]).addClass('active');
  $(tabs[n]).removeClass('d-none');
  $('#back_button').attr('disabled', n == 0 ? true : false);
  n == tabs.length - 1
    ? $('#next_button')
        .text('Створити користувача')
        .removeAttr('onclick')
        .attr('onclick', 'showModal()')
    : $('#next_button')
        .attr('type', 'button')
        .text('Наступний крок')
        .attr('onclick', 'next()');
}

function next() {
  $(tabs[current]).addClass('d-none');
  $(tabs_pill[current]).removeClass('active');

  current++;
  loadFormData(current);
}

function back() {
  $(tabs[current]).addClass('d-none');
  $(tabs_pill[current]).removeClass('active');

  current--;
  loadFormData(current);
}

function showModal() {
  let login = $('#login').val() || $('#login2').val();
  let parole = $('#parole').val() || $('#parole2').val();
  localStorage.setItem('Login', login);
  localStorage.setItem('Password', parole);
  let str = 'Логін: ' + login + `<br>` + 'Пароль: ' + parole;
  $('#modal-body').html(str);
  $('#exampleModal').modal('show');
  $('#copy').click(function () {
    localStorage.removeItem('Login');
    localStorage.removeItem('Password');
  });
}

function getImagePreview(event) {
  let image = URL.createObjectURL(event.target.files[0]);
  let imagediv = document.getElementById('preview');
  let newimg = document.createElement('img');
  imagediv.innerHTML = '';
  newimg.src = image;
  newimg.width = '150';
  newimg.height = '100';
  imagediv.appendChild(newimg);
}

function randString(id) {
  let dataSet = $(id).attr('data-character-set').split(',');
  let possible = '';
  if ($.inArray('a-z', dataSet) >= 0) {
    possible += 'abcdefghijklmnopqrstuvwxyz';
  }
  if ($.inArray('A-Z', dataSet) >= 0) {
    possible += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  if ($.inArray('0-9', dataSet) >= 0) {
    possible += '0123456789';
  }
  if ($.inArray('#', dataSet) >= 0) {
    possible += '![]{}()%&*$#^<>~@|';
  }
  let text = '';
  for (let i = 0; i < $(id).attr('data-size'); i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

$('.getNewPass').click(function () {
  let field = $(this).closest('div').find('input[rel="gp"]');
  field.val(randString(field));
});

const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

const alert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>',
  ].join('');

  alertPlaceholder.append(wrapper);
};

const alertTrigger = document.getElementById('liveAlert');
if (alertTrigger) {
  alertTrigger.addEventListener('change', () => {
    alert('Вакансія відкрита', 'success');
  });
}
