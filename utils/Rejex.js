 const nameRegex = /^[A-Za-z\u0621-\064A\s]{3,}$/;
  const skillRegex = /^[A-Za-zÀ-ÿ\u0621-\064A\s'-]{3,}$/;
  const amountRegex = /^[0-9]{1,3}$/;

  function regex(){
    let valid =true
  if (!nameRegex.test(add_freelance_Form.elements.name.value.trim())) {
    alert("Nom invalide (3 à 40 lettres)");
    return valid
  }

  if (!skillRegex.test(add_freelance_Form.elements.skils.value.trim())) {
    alert("Compétence invalide");
    return valid; 
  }

  if (!amountRegex.test(add_freelance_Form.elements.amaunt.value.trim())) {
    alert("Montant invalide");
    return valid;
  }

  return valid
}

export {nameRegex , skillRegex , amountRegex ,regex}