module.exports = {
    apps: [
        {
            name: "Server",
            script: "npm",
            automation: false,
            args: "run express",
            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production"
            }
        },
        {
            name: "SyncRoutines",
            script: "npm",
            automation: false,
            args: "run sync",
            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production"
            }
        }
    ]
}