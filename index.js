'use strict';
const Hapi = require('hapi');
const Inert = require('inert');
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'videoclub',
    password: 'yulyss',
    port: 5432
});
const server = new Hapi.Server({
    port: 3000,
    host: "localhost",
    routes: {
        files: {
            relativeTo: './public'
        }
    }
});

const init = async () => {
    await server.register(Inert);
    server.route({
        method: 'GET',
        path: '/public/{param*}',
        handler: {
            directory: {
                path: '..',
                redirectToSlash: true,
                index: true,
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello, world!';
        }
    });
    server.route({
        method: 'GET',
        path: '/socios',
        handler: async (request, h) => {
            let result = await pool.query ('SELECT * FROM socios');
            return result.rows;
        }
    });
    server.route({
        method: 'POST',
        path: '/socios',
        handler: async (request, h) => {
            try {
                let body = request.payload;
                let result = await pool.query ('INSERT INTO socios VALUES($1, $2, $3, $4)',[body.codigo,body.nombre,body.direccion,body.telefono]);
                return result.rows;
            } catch (error) {
                console.log(error)
            }
        }
    });
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();