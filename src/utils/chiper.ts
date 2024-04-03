import { createCipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const bcrypt = require('bcrypt')

export const encrypting = async (str: string) => {
    const iv = randomBytes(16)
    const pass = 'HafidzHakimalwidjaoiwdoawd'
    const key = (await promisify(scrypt)(pass, Buffer.from('salt'), 32)) as Buffer
    const chiper = createCipheriv('aes-256-ctr', key, iv)

    const encrypted = Buffer.concat([chiper.update(str),chiper.final()])

    return iv.toString('hex') + ":" + encrypted.toString('hex')
}


export const hashPassword = async (pass: string) => {
    const saltRounds = 10
    const hash = await bcrypt.hash(pass, saltRounds)
    return hash
}