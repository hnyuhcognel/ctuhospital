validator({
  form: '#formContentSignIn',
  formGroupSelector: '.form-group',
  errorSelector: '.form-message',
  rules: [
    validator.isRequired('#username', 'Vui lòng nhập tên'),
    validator.minLength('#password', 6),
  ]
})

validator({
  form: '#formContentSignUp',
  formGroupSelector: '.form-group',
  errorSelector: '.form-message',
  rules: [
    validator.isRequired('#username', 'Vui lòng nhập tên đăng nhập'),
    validator.maxLength('#username', 16),
    validator.minLength('#password', 6),
    validator.isRequired('#confirm-password'),
    validator.isConfirmed('#confirm-password', function () {
      return document.querySelector('#formContentSignUp #password').value
    }, 'Mật khẩu nhập lại không chính xác')
  ]
})

validator({
  form: '#formContentChangePass',
  formGroupSelector: '.form-group',
  errorSelector: '.form-message',
  rules: [
    validator.minLength('#old_password', 6),
    validator.minLength('#new_password', 6),
    validator.isRequired('#confirm-password'),
    validator.isConfirmed('#confirm-password', function () {
      return document.querySelector('#formContentSignUp #password').value
    }, 'Mật khẩu nhập lại không chính xác')
  ]
})

validator({
  form: '#new-patient__form',
  formGroupSelector: '.form-group',
  errorSelector: '.form-message',
  rules: [
    validator.isRequired('#first-name', 'Vui lòng nhập họ đệm'),
    validator.isRequired('#last-name', 'Vui lòng nhập tên'),
    validator.isRequired('#gender', 'Vui lòng chọn giới tính'),
    validator.isEmail('#email', 'Vui lòng nhập E-mail'),
    validator.xDigits('#insurance-number', 10, 'Số BHXH phải có đủ 10 kí tự'),
    validator.isPhoneNumber('#phone-number', 'Vui lòng nhập số điện thoại'),
    validator.isRequired('#date-of-birth', 'Vui lòng chọn ngày sinh'),
    validator.isRequired('#place-of-birth', 'Vui lòng nhập nơi sinh'),
    validator.isRequired('#address', 'Vui lòng nhập địa chỉ'),
    validator.isRequired('#city', 'Vui lòng chọn mục này'),
    validator.isRequired('#province', 'Vui lòng chọn mục này'),
    validator.isRequired('#village', 'Vui lòng chọn mục này'),
    validator.isRequired('#blood-group', 'Vui lòng chọn nhóm máu'),
  ]
})

validator({
  form: '#register__form',
  formGroupSelector: '.form-group',
  errorSelector: '.form-message',
  rules: [
    validator.isRequired('#first-name', 'Vui lòng nhập họ và tênx đệm'),
    validator.isRequired('#last-name', 'Vui lòng nhập tên'),
    validator.isPhoneNumber('#phone-number', 'Vui lòng nhập số điện thoại'),
    validator.isRequired('#date-of-examination', 'Vui lòng chọn ngày giờ khám'),
  ]
})
var changeDateFormatter = selector => {
  var count = document.querySelectorAll(selector)
  for (var i = 0; i < count.length; i++) {
    var str = document.querySelectorAll(selector)[i].innerHTML
    var date = new Date(str)
    d = date.getDate()
    m = date.getMonth() + 1
    y = date.getFullYear()
    if (d < 10) d = '0' + d
    if (m < 10) m = '0' + m
    document.querySelectorAll(selector)[i].innerHTML = `${d}-${m}-${y}`
  }
}

var getTime = selector => {
  var count = document.querySelectorAll(selector)
  for (var i = 0; i < count.length; i++) {
    var str = document.querySelectorAll(selector)[i].innerHTML
    var date = new Date(str)
    h = date.getHours()
    m = date.getMinutes()
    if (h < 10) h = '0' + h
    if (m < 10) m = '0' + m
    document.querySelectorAll(selector)[i].innerHTML = `${h}:${m}`
  }
}

changeDateFormatter('.dob-field')
changeDateFormatter('.date-of-birth-content')
changeDateFormatter('.doe-field')
changeDateFormatter('.date-examinated')
getTime('.doe-time-field')

var selCity = document.querySelector('#city')
var selProvince = document.querySelector('#province')
var selVillage = document.querySelector('#village')

var selCityLength = document.querySelector('#city').length
var selProvinceLength = document.querySelector('#province').length
var selVillageLength = document.querySelector('#village').length
var address = []
var j = 1

for (var i = 1; i <= selProvinceLength - 1; i++) {
  selProvince.options[i].style.display = "none"
}
for (var i = 1; i <= selVillageLength - 1; i++) {
  selVillage.options[i].style.display = "none"
}

for (var i = 1; i <= selCityLength - 1; i++) {
  var addressProvince = []
  while (selProvince.options[j] !== undefined && selProvince.options[j].getAttribute('cityid') == i) {
    var opt = selProvince.options[j]
    var provinceId = []
    id = selProvince.options[j].getAttribute('provinceid')
    provinceId.push(opt.value)
    provinceId.push(id)
    addressProvince.push(provinceId)
    j++
  }
  address.push(addressProvince)
}
// console.log(address)
selProvince.innerHTML = '<option value="" selected>-- Chọn --</option>'

var getProvince = () => {
  selProvince.innerHTML = '<option value="" selected>-- Chọn --</option>'
  var cityId = selCity.selectedIndex - 1
  for (var i = 0; i < address[cityId].length; i++) {
    $("#province").append(`<option value="${address[cityId][i][0]}" provinceid="${address[cityId][i][1]}">${address[cityId][i][0]}</option>`)
  }
}

let province = []
for (var i = 1; i <= selProvinceLength - 1; i++) {
  var village = []
  for (var k = 1; k <= selVillageLength - 1; k++) {
    if (selVillage.options[k].getAttribute('provinceid') == i && selVillage.options[k] !== undefined) {
      var opt = selVillage.options[k]
      village.push(opt.value)
    }

  }
  province.push(village)
}
selVillage.innerHTML = '<option value="" selected>-- Chọn --</option>'

var getVillage = () => {
  selVillage.innerHTML = '<option value="" selected>-- Chọn --</option>'
  var provinceId = parseInt(selProvince.options[selProvince.selectedIndex - 1].getAttribute('provinceid'))
  for (var i = 0; i < province[provinceId].length; i++) {
    $("#village").append(`<option value="${province[provinceId][i]}">${province[provinceId][i]}</option>`)
  }
}

