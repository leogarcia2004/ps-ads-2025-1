import {z} from 'zod';

const min_selling_date = '2020-01-01'

const Cars = z.object({

    brand: z.string()
        .trim()   // Retira espaços em branco do início e do fim
        .min(1, { message: 'Marca deve ter, no mínimo, 1 caractere.' })
        .max(25, { message: 'Marca pode ter, no máximo, 25 caracteres.' }),
    
    model: z.string()
        .trim()   
        .min(1, { message: 'Modelo deve ter, no mínimo, 1 caractere.' })
        .max(25, { message: 'Modelo pode ter, no máximo, 25 caracteres.' }),

    color: z.preprocess(
        val => typeof val === 'string' ? val.toLowerCase() : val,
        z.union([
            z.literal("amarelo"),
            z.literal("azul"),
            z.literal("branco"),
            z.literal("cinza"),
            z.literal("dourado"),
            z.literal("laranja"),
            z.literal("marrom"),
            z.literal("prata"),
            z.literal("preto"),
            z.literal("rosa"),
            z.literal("roxo"),
            z.literal("verde"),
            z.literal("vermelho")
        ])
        ),
    
    year_manufacture: z.number()
        .int({ message: 'Ano deve ser um número inteiro.' })
        .gte(1960, { message: 'Ano deve ser maior ou igual a 1960.' })
        .lte(new Date().getFullYear(), { message: `Ano deve ser menor ou igual ao ano atual.` }),
     
    imported: z.boolean()
        .default(false),

    plates: z.string()
        .trim()   
        .length(8, { message: 'Placa deve ter exatamente 8 caracteres.' })
        .regex(/^[A-Z]{3}-\d{4}$/, { message: 'Placa deve seguir o formato ABC-1234.' }),

    selling_date: z.coerce.date().optional()
    .refine(val => val instanceof Date && !isNaN(val.getTime()), {
        message: 'Data de venda deve ser uma data válida.'
    })
    
    .min(new Date(min_selling_date), { message: 'Data de venda deve ser maior ou igual a 01/01/2020.' })
    .max(new Date())
    .optional(),

    selling_price: z.coerce.number().optional()
        .positive({ message: 'Preço de venda deve ser um número positivo.' })
        .gte(1000, { message: 'Preço de venda deve ser maior ou igual a 1000.' })
        .lte(5000000, { message: 'Preço de venda deve ser menor ou igual a 5.000.000.' }),

});

export default Cars;