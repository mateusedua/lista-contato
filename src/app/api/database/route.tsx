const sqlite3 = require('sqlite3').verbose()



export async function GET() {

    const db = new sqlite3.Database('db')

    db.run(`
        drop table categoria;
        drop table cantatos;
        create table categoria(
            id_categoria INTEGER primary key AUTOINCREMENT,
            nome_categoria varchar(240),
            data_inclusao datetime default CURRENT_TIMESTAMP
        );

        insert into categoria(nome_categoria)
        values('Pessoal'),
        ('Linkedin'),
        ('Amigos'),
        ('Trabalho');

        create table contatos(
            id_contato INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(240) not NULL,
            email varchar(240) not NULL,
            celular varchar(240) not NULL,
            id_categoria INTEGER,
            data_inclusao datetime DEFAULT CURRENT_TIMESTAMP,
            FOREIGN key (id_categoria) REFERENCES categoria(id_categoria)
        );

        insert into contatos(nome,email, celular, id_categoria)
        values('Mateus Eduardo', 'mateus@gmail.com', '43999831861', 1),
        ('Mateus Eduardo', 'mateus@gmail.com', '43999831861', 1),
        ('Mateus Eduardo', 'mateus@gmail.com', '43999831861', 1),
        ('Mateus Eduardo', 'mateus@gmail.com', '43999831861', 1),
        ('Mateus Eduardo', 'mateus@gmail.com', '43999831861', 1);
`)

    return Response.json({})
}