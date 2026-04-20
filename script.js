class Register{
	constructor(registerEl) {
		this.registerEl = registerEl;
		this.form = registerEl.querySelector('#form');
		this.formEmail = registerEl.querySelector('#email');
		this.formErrorMessage = registerEl.querySelector('#errorMessage');
	}

	show(){
		this.registerEl.classList.remove('hidden');
	}

	hidden(){
		this.registerEl.classList.add('hidden');
	}

	resetForm(){
		this.form.classList.remove('error');
		this.formEmail.value = '';
		this.formErrorMessage.value = '';
	}

	#isEmpty(input){
		return input.trim().length === 0;
	}

	#isNotEmail(email){
		const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return !regex.test(email);
	}

	validateEmail (){
		const email = this.formEmail.value;
		if(this.#isEmpty(email)){
			this.form.classList.add('error');
			this.formErrorMessage.textContent = 'Valid email required'
			return false;
		}

		if(this.#isNotEmail(email)){
			this.form.classList.add('error');
			this.formErrorMessage.textContent = 'Is not a valid email'
			return false;
		}

		return true;
	}
}

class Message{
	constructor(messageEl){
		this.messageEl = messageEl;
		this.btnHidden = messageEl.querySelector('#message-btn-hidden');
		this.showEmailEl = messageEl.querySelector('#message__show-email')
	}

	show(){
		this.messageEl.classList.remove('hidden');
	}

	showEmail(email){
		this.showEmailEl.textContent = email;
	}

	hidden(){
		this.messageEl.classList.add('hidden');
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const register = new Register(document.querySelector("#register"));
	const message = new Message(document.querySelector('#message'));

	if(register.registerEl && message.messageEl){
		register.form.addEventListener('submit', (e) => {
			e.preventDefault();
			const validateEmail = register.validateEmail();

			// if validate email pass
			if(validateEmail){
				register.hidden();
				message.show();
				message.showEmail(register.formEmail.value);
				register.resetForm();
			}
		});

		message.btnHidden.addEventListener('click', () => {
			message.hidden();
			register.show();
		});
	}
})




