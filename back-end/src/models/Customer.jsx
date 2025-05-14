import {z} from 'zod';
import {cpf} from 'cpf-cnpj-validator';


const maxDateOfBirth = new Date();
maxDateOfBirth.setFullYear(maxDateOfBirth.getFullYear() - 18);

const minDateOfBirth = new Date();
minDateOfBirth.setFullYear(minDateOfBirth.getFullYear() - 120);

const Customer = z.object({
    name: z.string()
        .trim() // Retira espaços em branco no início e no final
        .min(3, {message: 'O nome deve ter pelo menos 5 caracteres'})
        .max(50, {message: 'O nome deve ter no máximo 100 caracteres'})
        .includes(' ', {message: 'O nome deve conter pelo menos um espaço'}),
})

export default Customer;