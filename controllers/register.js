handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password} = req.body
    if (!email || !name || !password){
        return res.status(400).json("Invalid input")
    }
    const hash = bcrypt.hashSync(password)
        db.transaction(trx => {
            db.insert({
                hash: hash,
                email: email,
            })
            .into('login')
            .transacting(trx)
            .returning('email')
            .then(loginEmail => {
                db("users")
                .returning('*')
                .insert({
                    email: loginEmail[0].email,
                    name: name,
                    joined: new Date()
                })
                .transacting(trx)
                .then(user =>{
                    res.json("user inserted", user);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .then(inserts => {
            console.log(inserts.length + " new user saved.")
        })
    .catch(err => res.status(400).send(err));
}

module.exports = {
    handleRegister: handleRegister
};