module.exports = {

    apps: [

        {
            name: "ecommerce-api",

            script: "./src/server.js",

            instances: "max",

            exec_mode: "cluster",

            autorestart: true,

            watch: false,

            max_memory_restart: "500M",

            env: {

                NODE_ENV: "development"

            },

            env_production: {

                NODE_ENV: "production"

            },

            time: true,

            merge_logs: true

        }

    ]

};