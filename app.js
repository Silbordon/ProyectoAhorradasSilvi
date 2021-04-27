// Function Nav-Burger
const burgerMenu = document.getElementById('navbar-burger')
const navbarBasicExample = document.getElementById('navbarBasicExample')

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('is-active')
    navbarBasicExample.classList.toggle('is-active')
})



// Function Time
const fechaFiltros = document.getElementById("filters-date");
const operationDate = document.getElementById("operation-date");

const date = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`
}
fechaFiltros.value = date();
operationDate.value = date();



//Funcion nueva operacion y cancelar
const balanceSection = document.getElementById('balance-section'); //Seccion balance
const formOperation = document.getElementById('form-operation'); // Seccion nueva operacion
const btnNewOperation = document.getElementById('btn-new-operation') //Boton + Nueva Operacion
const btnCancelOperation = document.getElementById('btn-cancel-operation'); //Boton cancelar

btnNewOperation.addEventListener('click', () => {
    balanceSection.classList.add('is-hidden')
    sectionReports.classList.add('is-hidden')
    formOperation.classList.remove('is-hidden')
    formEditOperation.classList.add('is-hidden')
})

btnCancelOperation.addEventListener('click', () => {
    formOperation.classList.add('is-hidden')
    formEditOperation.classList.add('is-hidden')
    balanceSection.classList.remove('is-hidden')
})



// funcion mostrar y ocultar filtros
const btnShowFilters = document.getElementById('btn-show-filters')
const btnHideFilters = document.getElementById('btn-hide-filters')
const filters = document.getElementById('filters')

btnHideFilters.addEventListener('click', () => {
    filters.classList.add('is-hidden')
    btnHideFilters.classList.add('is-hidden')
    btnShowFilters.classList.remove('is-hidden')
})
btnShowFilters.addEventListener('click', () => {
    filters.classList.remove('is-hidden')
    btnHideFilters.classList.remove('is-hidden')
    btnShowFilters.classList.add('is-hidden')
})


//Funcion Navbar
const btnBalance = document.getElementById('btn-balance'); //boton balance
const btnCategories = document.getElementById('btn-categories'); //boton categorias
const btnReports = document.getElementById('btn-reports'); //boton reportes
const sectionReports = document.getElementById('section-reports'); //seccion reportes
const sectionCategories = document.getElementById('section-categories'); //seccion categorias


btnBalance.addEventListener('click', () => {
    balanceSection.classList.remove('is-hidden')
    sectionReports.classList.add('is-hidden')
    sectionCategories.classList.add('is-hidden')
    formOperation.classList.add('is-hidden')
    formEditOperation.classList.add('is-hidden')

});

btnCategories.addEventListener('click', () => {
    balanceSection.classList.add('is-hidden')
    sectionReports.classList.add('is-hidden')
    sectionCategories.classList.remove('is-hidden')
    formOperation.classList.add('is-hidden')
    formEditOperation.classList.add('is-hidden')

});

btnReports.addEventListener('click', () => {
    balanceSection.classList.add('is-hidden')
    sectionReports.classList.remove('is-hidden')
    sectionCategories.classList.add('is-hidden')
    formOperation.classList.add('is-hidden')
    formEditOperation.classList.add('is-hidden')
});



//Function Nueva operacion
const btnAddOperation = document.getElementById('btn-add-operation');
const operationDescription = document.getElementById("operation-description");
const operationAmount = document.getElementById("operation-amount");
const operationType = document.getElementById("operation-type");
const operationCategories = document.getElementById("operation-categories");


const withoutOperations = document.getElementById("without-operations");
const operationList = document.getElementById("operations-list");

const addNewOperation = document.getElementById('add-new-operation')

const resetFormOperation = () => {
    operationDescription.value = '';
    operationAmount.value = 0;
    operationType.value = 'Gasto';
    operationCategories.value = categories[0].nombre
    operationDate.value = date();
}

let operations = [];

btnAddOperation.addEventListener('click', () => {
    const newOperation = {
        id: uuid.v4(),
        descripcion: operationDescription.value,
        monto: parseInt(operationAmount.value),
        tipo: operationType.value,
        categoria: operationCategories.value,
        fecha: operationDate.value
    }

    if (newOperation.tipo === 'Gasto') {
        newOperation.monto = Number(newOperation.monto) * (- 1)
    }

    operations.push(newOperation);
    localStorage.setItem('operacionesStorage', JSON.stringify(operations));
    const getOperacionesStorage = JSON.parse(localStorage.getItem('operacionesStorage'))
    operationsHtml(getOperacionesStorage);

    resetFormOperation();
    formOperation.classList.add('is-hidden')
    balanceSection.classList.remove('is-hidden')
})


// chequea el array operations
const checkOperations = (arrOperaciones) => {
    if (arrOperaciones.length === 0) {
        operationList.classList.add("is-hidden");
        withoutOperations.classList.remove("is-hidden");
    } else {
        withoutOperations.classList.add("is-hidden");
        operationList.classList.remove("is-hidden");
    }
};



//para pintar en html
const operationsHtml = (operations) => {
    checkOperations(operations);
    addNewOperation.innerHTML = '';
    let box;
    for (let i = 0; i < operations.length; i++) {
        if (operations[i].tipo === 'Gasto') {
            box = `
        <div id="${operations[i].id}" class ="columns mt-3 m-0">
        <div class="column is-3 is-size-6">${operations[i].descripcion}</div>
        <div class="column is-2 is-size-7 "><span class="has-text-success has-text-weight-medium has-background-info-light p-1">${operations[i].categoria}</span></div>
        <div class="column is-3 is-size-6">${operations[i].fecha}</div>
        <div class="column is-2 is-size-6 has-text-danger ">${operations[i].monto}</div>
        <div class="column is-2 px-0">
        <a class="is-size-7 mr-1" onclick="editOperation('${operations[i].id}')">Editar</a>
        <a class="is-size-7" onclick="deleteOperation('${operations[i].id}')">Eliminar</a>
        </div>
    </div>
        `
        } else {
            box = `
         <div id="${operations[i].id}" class ="columns mt-3 m-0">
         <div class="column is-3 is-size-6">${operations[i].descripcion}</div>
         <div class="column is-2 is-size-7 "><span class="has-text-success has-text-weight-medium has-background-info-light p-1">${operations[i].categoria}</span></div>
         <div class="column is-3 is-size-6">${operations[i].fecha}</div>
         <div class="column is-2 is-size-6 has-text-success">${operations[i].monto}</div>
         <div class="column is-2 px-0">
         <a class="is-size-7 mr-1" onclick="editOperation('${operations[i].id}')">Editar</a>
         <a class="is-size-7" onclick="deleteOperation('${operations[i].id}')">Eliminar</a>
         </div>
     </div>
         `
        }
        addNewOperation.insertAdjacentHTML('beforeend', box);
    }
};

operations = JSON.parse(localStorage.getItem('operacionesStorage')) ?? operations
operationsHtml(operations);



//EDITAR NUEVA OPERACION
const btnEditOperation = document.getElementById('btn-edit-operation');
const formEditOperation = document.getElementById('form-edit-operation') //Section de editar nueva operacion
const operationEditDescription = document.getElementById("operation-edit-description");
const operationEditAmount = document.getElementById("operation-edit-amount");
const operationEditType = document.getElementById("operation-edit-type");
const operationEditCategories = document.getElementById("operation-edit-categories");
const operationEditDate = document.getElementById('operation-edit-date');

//esconder seccion de editar categoria
const hideSectionsOperation = () => {
    sectionCategories.classList.add("is-hidden");
    sectionReports.classList.add("is-hidden");
    formOperation.classList.add("is-hidden");
    balanceSection.classList.add("is-hidden");
    editCategorySection.classList.add("is-hidden");
    formEditOperation.classList.remove("is-hidden");
};

const showSectionOperation = () => {
    sectionCategories.classList.add("is-hidden");
    sectionReports.classList.add("is-hidden");
    formOperation.classList.add("is-hidden");
    balanceSection.classList.remove("is-hidden");
    editCategorySection.classList.add("is-hidden");
    formEditOperation.classList.add("is-hidden");

};

//EDITAR operaciones
let position; //Posicion en el arreglo de operacion a editar
const editOperation = (operation) => {
    hideSectionsOperation();
    position = operations.findIndex((e) => e.id == operation);
    operationEditDescription.value = operations[position].descripcion
    operationEditAmount.value = operations[position].monto
    operationEditType.value = operations[position].tipo
    operationEditCategories.value = operations[position].categoria
    operationEditDate.value = operations[position].fecha
    return position;
};

btnEditOperation.addEventListener('click', () => {
    operations[position].descripcion = operationEditDescription.value;
    operations[position].monto = operationEditAmount.value;
    operations[position].tipo = operationEditType.value;
    operations[position].categoria = operationEditCategories.value;
    operations[position].fecha = operationEditDate.value;
    localStorage.setItem('operacionesStorage', JSON.stringify(operations));
    operationsHtml(operations);
    showSectionOperation();
})



//eliminar operaciones
const deleteOperation = (operation) => {
    const value = operations.findIndex((elem) => elem.id == operation);
    if (value >= 0) {
        operations.splice(value, 1);
        localStorage.setItem('operacionesStorage', JSON.stringify(operations));
        operationsHtml(operations);
    }

};



//SECCION OPERACIONES
const inputCategories = document.getElementById('category-name'); //input categorias
const btnAddCategories = document.getElementById('btn-add-category'); // boton agregar de categorias
const categoriesList = document.getElementById('categories-list'); // box de lista en categorias
const filtersCategories = document.getElementById('filters-categories');  //select de filter categorias

const editCategorySection = document.getElementById("edit-category-section");
const inputEditCategory = document.getElementById("edit-category-name");
const btnEditCategory = document.getElementById("btn-edit-category");
const btnCancelEditCategory = document.getElementById('btn-cancel-edit-category')




//Array DEL OBJETO CATEGORIAS
let categories = [
    { id: 0, nombre: "Comida" },
    { id: 1, nombre: "Educacion" },
    { id: 2, nombre: "Salidas" },
    { id: 3, nombre: "Servicios" },
    { id: 4, nombre: "Trabajo" },
    { id: 5, nombre: "Transporte" }
];


// pintar en la seccion categorias en los select
const categoriesHTML = (categories) => {
    categoriesList.innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        const categoria = `
    <div class="columns m-0 is-justify-content-space-between is-9 is-offset-3">
      <div class="column is-size-7 is-10"><span class="has-background-info-dark has-text-white radius p-1">${categories[i].nombre}</span></div>
      <div class="column is-2 px-0">
      <a href="#" class="is-size-7 mr-2" onclick="editCategory('${categories[i].id}')" >Editar</a>
      <a href="#" class="is-size-7" onclick="deleteCategory('${categories[i].id}')">Eliminar</a>
      </div>
    </div>
    `
        categoriesList.insertAdjacentHTML('beforeend', categoria)
    }
}

categories = JSON.parse(localStorage.getItem('categoriasStorage')) ?? categories
categoriesHTML(categories);


//pintar en HTML en la seccion de nueva operacion y filtros
const categoriesSelect = (categories) => {
    operationCategories.innerHTML = '';
    filtersCategories.innerHTML = `<option>Todas</option>`;
    for (let i = 0; i < categories.length; i++) {
        const categoria = `
       <option>${categories[i].nombre}</option>
        `
        operationCategories.insertAdjacentHTML('beforeend', categoria);
        filtersCategories.insertAdjacentHTML('beforeend', categoria);
        operationEditCategories.insertAdjacentHTML('beforeend', categoria);
    }
}
categoriesSelect(categories);


//Funcion al boton AGREGAR EN LA SECCION CATEGORIAS
btnAddCategories.addEventListener('click', () => {
    const newCategory = inputCategories.value;
    categories.push({ id: categories.length, nombre: newCategory });

    localStorage.setItem('categoriasStorage', JSON.stringify(categories))
    const getCategoriesStorage = JSON.parse(localStorage.getItem('categoriasStorage'))
    categoriesHTML(getCategoriesStorage);
    categoriesSelect(getCategoriesStorage);

    inputCategories.value = '';
});


//esconder seccion de editar categoria
const hideSectionsEdit = () => {
    sectionCategories.classList.add("is-hidden");
    sectionReports.classList.add("is-hidden");
    formOperation.classList.add("is-hidden");
    balanceSection.classList.add("is-hidden");
    editCategorySection.classList.remove("is-hidden");
};

const hideEditSection = () => {
    sectionCategories.classList.remove("is-hidden");
    sectionReports.classList.add("is-hidden");
    formOperation.classList.add("is-hidden");
    balanceSection.classList.add("is-hidden");
    editCategorySection.classList.add("is-hidden");
};



//editar categoria
let index;
const editCategory = (category) => {
    hideSectionsEdit();
    index = categories.findIndex((e) => e.id == category);
    inputEditCategory.value = categories[index].nombre
    return index;
};

btnEditCategory.addEventListener("click", () => {
    const newValue = inputEditCategory.value;
    categories[index].nombre = newValue;
    localStorage.setItem('categoriasStorage', JSON.stringify(categories))

    categoriesHTML(categories);
    categoriesSelect(categories);
    operationsHtml(operations)
    hideEditSection()
});



//eliminar categoria
const deleteCategory = (category) => {
    const categoryName = categories.find((elem) => elem.id == category);

    const value = categories.findIndex((elem) => elem.id == category);
    if (value >= 0) {
        categories.splice(value, 1);
        localStorage.setItem('categoriasStorage', JSON.stringify(categories))
        categoriesHTML(categories);
        categoriesSelect(categories);
    }
};


//PINTAR BALANCE
const balanceGanancia = document.getElementById('balance-ganancia');
const balanceTotal = document.getElementById('balance-total');
const balanceGasto = document.getElementById('balance-gasto');

const balanceData = (operaciones) => {
    return operaciones.reduce((balance, operacion) => {
        if (operacion.tipo === 'Ganancia') {
            return {
                ...balance,
                ganancias: balance.ganancias + operacion.monto,
                total: balance.total + operacion.monto,
            }
        }

        if (operacion.tipo === 'Gasto') {
            return {
                ...balance,
                gastos: balance.gastos + operacion.monto,
                total: balance.total + operacion.monto,
            }
        }
    },
        {
            ganancias: 0,
            gastos: 0,
            total: 0,
        }
    )
}

const balanceHTML = (operaciones) => {
    const objBalance = balanceData(operaciones);
    balanceTotal.classList.remove('has-text-success', 'has-text-danger')

    if (objBalance.total > 0) {
        balanceTotal.classList.add('has-text-success');
        balanceTotal.classList.remove('has-text-danger')
    }
    if (objBalance.total < 0) {
        balanceTotal.classList.remove('has-text-success');
        balanceTotal.classList.add('has-text-danger')
    }

    balanceGanancia.innerHTML = `$ ${objBalance['ganancias']}`;
    balanceGasto.innerHTML = `$ ${objBalance['gastos']}`;
    balanceTotal.innerHTML = `$${objBalance['total']}`;
}






// FILTROS
const filtersType = document.getElementById("filters-type");
const filtersOrder = document.getElementById("filters-order");


const filtrarTipo = (tipo, operaciones) => {
    const result = operaciones.filter((operacion) => operacion.tipo === tipo);
    return result;
};


const filtrarCategoria = (categoria, operaciones) => {
    const result = operaciones.filter((operacion) => operacion.categoria === categoria);
    return result;
};


const filtrarFechaMayorOIgual = (fecha, operaciones) => {
    const result = operaciones.filter(
        (operacion) => new Date(operacion.fecha).getTime() >= new Date(fecha).getTime());
    return result;
};




const ordenarMasMenosReciente = (operacion, orden) => {
    let result
    if (orden === 'ASC') {
        result = [...operacion].sort((a, b) => a.fecha > b.fecha ? 1 : -1)
    } else {
        result = [...operacion].sort((a, b) => a.fecha < b.fecha ? 1 : -1)
    }
    return result
}


const ordenarMayorMenorMonto = (operacion, orden) => {
    let result
    if (orden === 'menor') {
        result = [...operacion].sort((a, b) => a.monto > b.monto ? 1 : -1)
    } else {
        result = [...operacion].sort((a, b) => a.monto < b.monto ? 1 : -1)
    }
    return result
};


const ordenarAZ_ZA = (operacion, orden) => {
    let result
    if (orden === 'A-Z') {
        result = [...operacion].sort((a, b) => a.descripcion > b.descripcion ? 1 : -1)
    } else {
        result = [...operacion].sort((a, b) => a.descripcion < b.descripcion ? 1 : -1)
    }
    return result
};


const filtrarOperaciones = () => {
    const tipo = filtersType.value;
    const categoria = filtersCategories.value;
    const fecha = fechaFiltros.value.replace(/-/g, "/");
    const orden = filtersOrder.value;

    let operaciones = operations;

    if (tipo !== "Todas") {
        operaciones = filtrarTipo(tipo, operaciones);
    }

    if (categoria !== "Todas") {
        operaciones = filtrarCategoria(categoria, operaciones);
    }

    operaciones = filtrarFechaMayorOIgual(fecha, operaciones);


    switch (orden) {
        case "Mas Reciente":
            operaciones = ordenarMasMenosReciente(operaciones, "DESC")
            break;
        case "Menos Reciente":
            operaciones = ordenarMasMenosReciente(operaciones, "ASC")
            break;
        case "Menor Monto":
            operaciones = ordenarMayorMenorMonto(operaciones, "menor")
            break;
        case "Mayor Monto":
            operaciones = ordenarMayorMenorMonto(operaciones, "mayor")
            break;
        case "A-Z":
            operaciones = ordenarAZ_ZA(operaciones, "A-Z")
            break;
        case "Z-A":
            operaciones = ordenarAZ_ZA(operaciones, "Z-A")
            break;
        default:
            break;
    }
    operationsHtml(operaciones)
    balanceHTML(operaciones)
}

filtersType.addEventListener("change", filtrarOperaciones);
filtersCategories.addEventListener("change", filtrarOperaciones);
fechaFiltros.addEventListener('change', filtrarOperaciones);
filtersOrder.addEventListener('change', filtrarOperaciones);

filtrarOperaciones();



