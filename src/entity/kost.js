const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Kost",
    tableName: "kost",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: "uuid",
        },
        create_time: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
        name: {
            type: "varchar",
        },
        description: {
            type: "text",
        },
        address: {
            type: "text",
        },
        timegate: {
            type: "boolean",
        },
        kitchen: {
            type: "boolean",
        },
        parking: {
            type: "boolean",
        },
        laundry: {
            type: "boolean",
        },
        cctv: {
            type: "boolean",
        },
        wifi: {
            type: "boolean",
        },
        security: {
            type: "boolean",
        },
        drinkingwater: {
            type: "boolean",
        },
    },
});
