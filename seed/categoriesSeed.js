import Categories from '../models/categories.js'

const categoriesSeed = async () => {
    try {
        await Categories.destroy({ where: {} });
        const categories = [
            { name: 'hogar' },
            { name: 'finanzas' },
            { name: 'reuniones' },
            { name: 'formación' },
            { name: 'viajes' },
            { name: 'entretenimiento' },
            { name: 'hobbies' }
        ];

        await Categories.bulkCreate(categories);
        console.log('Categorias seed execute');
    } catch (error) {
        console.log(error);

    }
}

export default categoriesSeed;