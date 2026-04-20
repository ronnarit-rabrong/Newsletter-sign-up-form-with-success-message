class Register{
	constructor(registerEl) {
		if(!registerEl){
			throw new Error('Register component requires an element with id="register".');
		}

		const getRequired = (parent, selector) => {
			const el = parent.querySelector(selector);
			if(!el){
				throw new Error(`Register: required element "${selector}" not found inside register element.`);
			}

			return el;
		}

		const root = registerEl;
		this.registerEl = registerEl;
		this.form = getRequired(root, '[data-register-form]');
		this.formEmail = getRequired(root, '[data-register-email]')
		this.formErrorMessage =getRequired(root, '[data-register-error]')
	}

	show(){
		this.registerEl.classList.remove('hidden');
	}

	hide(){
		this.registerEl.classList.add('hidden');
	}

	resetForm(){
		this.form.classList.remove('error');
		this.formEmail.value = '';
		this.formErrorMessage.textContent = '';
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
		if (!messageEl) {
			throw new Error('Message component: messageEl is required. Expected element with id "#message".');
		}

		const getRequired = (parent, selector) => {
			const el = parent.querySelector(selector);
			if(!el){
				throw new Error(`Message: required element "${selector}" not found inside message element.`);
			}

			return el;
		}

		const root = messageEl;
		this.messageEl = messageEl;
		this.btnHidden = getRequired(root, '[data-message-btn-hiedden]');
		this.showEmailEl =getRequired(root, '[data-message-show-email]');
	}

	show(){
		this.messageEl.classList.remove('hidden');
	}

	hied(){
		this.messageEl.classList.add('hidden');
	}

	showEmail(email){
		this.showEmailEl.textContent = email;
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
				register.hide();
				message.show();
				message.showEmail(register.formEmail.value);
				register.resetForm();
			}
		});

		message.btnHidden.addEventListener('click', () => {
			message.hied();
			register.show();
		});
	}
})




