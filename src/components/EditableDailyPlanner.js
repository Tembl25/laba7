import React, { useState, useEffect } from 'react';

// Flux
const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };

    dispatch({});

    return { getState, dispatch, subscribe };
};

const TOGGLE_COMPONENT = 'TOGGLE_COMPONENT';
const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE';
const ADD_BRAND = 'ADD_BRAND';

const toggleComponent = (brand) => ({
    type: TOGGLE_COMPONENT,
    payload: brand
});

const toggleActive = (brand) => ({
    type: TOGGLE_ACTIVE,
    payload: brand
});

const addBrand = (newBrand) => ({
    type: ADD_BRAND,
    payload: newBrand
});

const initialState = {
    showComponents: {
        Brand1: true,
        Brand2: true,
        Brand3: true,
    },
    brands: JSON.parse(localStorage.getItem('bicycleBrands')) || [
        { brand: "Brand1", model: "Model1", type: "Type1", wheelDiameter: "26 inches", brakeType: "Disc brakes", active: true },
        { brand: "Brand2", model: "Model2", type: "Type2", wheelDiameter: "28 inches", brakeType: "V-brakes", active: true },
        { brand: "Brand3", model: "Model3", type: "Type3", wheelDiameter: "24 inches", brakeType: "Hydraulic brakes", active: true }
    ]
};

// reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_COMPONENT:
            const updatedShowComponents = {
                ...state.showComponents,
                [action.payload]: !state.showComponents[action.payload]
            };
            localStorage.setItem('showComponents', JSON.stringify(updatedShowComponents));
            return {
                ...state,
                showComponents: updatedShowComponents
            };
        case TOGGLE_ACTIVE:
            const updatedBrands = state.brands.map(item =>
                item.brand === action.payload ? { ...item, active: !item.active } : item
            );
            localStorage.setItem('bicycleBrands', JSON.stringify(updatedBrands));
            return {
                ...state,
                brands: updatedBrands
            };
        case ADD_BRAND:
            const newBrands = [...state.brands, action.payload];
            localStorage.setItem('bicycleBrands', JSON.stringify(newBrands));
            return {
                ...state,
                brands: newBrands
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

const BicycleRow = () => {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(store.getState());
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const { showComponents, brands } = state;

    const getRandomColor = () => {
        const colors = ['#ff0000', '#00ff00', '#0000ff'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const changeRandomComponentColor = () => {
        const randomBrand = brands[Math.floor(Math.random() * brands.length)].brand;
        const element = document.getElementById(randomBrand);
        if (element) {
            element.style.backgroundColor = getRandomColor();
        }
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const newBrand = {
            brand: form.brand.value,
            model: form.model.value,
            type: form.type.value,
            wheelDiameter: form.wheelDiameter.value,
            brakeType: form.brakeType.value,
            active: true
        };
        store.dispatch(addBrand(newBrand));
        store.dispatch(toggleComponent(newBrand.brand));
        form.reset();
    };

    return (
        <div className="bicycle-row-container">
            {brands.map(({ brand, model, type, wheelDiameter, brakeType, active }) => (
                showComponents[brand] && (
                    <div key={brand} id={brand} className={`bicycle-container ${active ? '' : 'inactive'}`}>
                        <h2>{brand} {model}</h2>
                        <p><strong>Тип:</strong> {type}</p>
                        <p><strong>Диаметр колёс:</strong> {wheelDiameter}</p>
                        <p><strong>Тип тормозов:</strong> {brakeType}</p>
                        <button onClick={() => store.dispatch(toggleActive(brand))}>{active ? 'Удалить' : 'Восстановить'}</button>
                    </div>
                )
            ))}
            <button onClick={changeRandomComponentColor}>Изменить цвет</button>
            <form onSubmit={handleAddFormSubmit}>
                <input type="text" name="brand" placeholder="Brand" required />
                <input type="text" name="model" placeholder="Model" required />
                <input type="text" name="type" placeholder="Type" required />
                <input type="text" name="wheelDiameter" placeholder="Wheel Diameter" required />
                <input type="text" name="brakeType" placeholder="Brake Type" required />
                <button type="submit">Добавить компонент</button>
            </form>
            <div className="checkbox-container">
                {brands.map(({ brand }) => (
                    <div key={brand} className="checkbox-item">
                        <input
                            type="checkbox"
                            checked={showComponents[brand]}
                            onChange={() => store.dispatch(toggleComponent(brand))}
                        />
                        <label>{brand}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BicycleRow;
