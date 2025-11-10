
  function regex(){
    let valid =true
  if (!nameRegex.test(add_freelance_Form.elements.name.value.trim())) {
    alert("Nom invalide (3 aa 40 lettres)");
    return valid
  }

  if (!skillRegex.test(add_freelance_Form.elements.skils.value.trim())) {
    alert("Competence invalide");
    return valid; 
  }

  if (!amountRegex.test(add_freelance_Form.elements.amaunt.value.trim())) {
    alert("Montant invalide");
    return valid;
  }

  return valid
}

export {nameRegex , skillRegex , amountRegex ,regex}

export const nameRegex = /^[A-Za-zÀ-ÿ\s'-]{3,40}$/;
export const skillRegex = /^[A-Za-zÀ-ÿ\s'-]{3,40}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const amountRegex = /^[0-9]{1,5}$/;
export const textRegex = /^.{5,200}$/;

export function validateInput(input, regex) {
  if (!regex.test(input.value.trim())) {
    input.classList.add("is-invalid");
    return false;
  }
  input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  return true;
}