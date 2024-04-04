const {Schema, model} = require('mongoose');
const {z} = require('zod'); 

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (v) => {
                const emailSchema = z.string().email();
                return emailSchema.safeParse(v).success;
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },  
    cart: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
});

const User = model('User', userSchema);

module.exports = User;