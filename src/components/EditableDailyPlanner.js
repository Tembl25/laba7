import React, { useState, useEffect } from 'react';

const BicycleRow = () => {
    const [showComponents, setShowComponents] = useState({
        Brand1: true,
        Brand2: true,
        Brand3: true,
    });

    const [brands, setBrands] = useState(() => {
        const storedBrands = localStorage.getItem('bicycleBrands');
        return storedBrands ? JSON.parse(storedBrands) : [
            { brand: "Brand1", model: "Model1", type: "Type1", wheelDiameter: "26 inches", brakeType: "Disc brakes", active: true },
            { brand: "Brand2", model: "Model2", type: "Type2", wheelDiameter: "28 inches", brakeType: "V-brakes", active: true },
            { brand: "Brand3", model: "Model3", type: "Type3", wheelDiameter: "24 inches", brakeType: "Hydraulic brakes", active: true }
        ];
    });

    useEffect(() => {
        localStorage.setItem('bicycleBrands', JSON.stringify(brands));
    }, [brands]);

    const toggleComponent = (brand) => {
        setShowComponents(prevState => ({
            ...prevState,
            [brand]: !prevState[brand]
        }));
    };

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

    const toggleActive = (brand) => {
        setBrands(prevBrands => prevBrands.map(item =>
            item.brand === brand ? { ...item, active: !item.active } : item
        ));
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
        setBrands(prevBrands => [...prevBrands, newBrand]);
        toggleComponent(newBrand.brand);
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
                        <button onClick={() => toggleActive(brand)}>{active ? 'Удалить' : 'Восстановить'}</button>
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
                            onChange={() => toggleComponent(brand)}
                        />
                        <label>{brand}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BicycleRow;
