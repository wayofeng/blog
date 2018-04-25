var btn = document.querySelector('.btn');
var title = document.querySelector('.title')
btn.addEventListener('click', function () {
	title.innerHTML = title.innerHTML ? '' : 'Hello World'
})
