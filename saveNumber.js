const {numberModel} = require('./model');

exports.newNumber = async () => {
    /** start mongoose transaction */
    const session = await dbConnection.startSession();
    session.startTransaction();

    /**
     * to use transactions you need to pass the session in create function
     * as option
     */
    await numberModel.create([{number: 13}], {session});

    /**
     * Transactions execute in isolation, so unless you pass a `session`
     * to `findOne()` you won't see the document until the transaction
     * is committed.
     * result should be undefined or null
     */
    let doc = await numberModel.findOne({number: 13});
    console.log(doc);

    /**
     * This `findOne()` will return the doc, because passing the `session`
     * means this `findOne()` will run as part of the transaction.
     * result should be database json object
     */
    doc = await numberModel.findOne({number: 13}).session(session);
    console.log(doc);

    /**
     * Once the transaction is committed, the write operation becomes
     * visible outside of the transaction.
     */
    await session.commitTransaction();
    doc = await numberModel.findOne({number: 13});
    console.log(doc);

    session.endSession();

    console.log('new number saved');
}


exports.updateNumber = async () => {
    /** start mongoose transaction */
    const session = await dbConnection.startSession();
    session.startTransaction();

    /**
     * to use transactions you need to pass the session in update function
     * as option
     */
    await numberModel.findOneAndUpdate({number: 13}, {number: 15}, {session})

    /**
     * Transactions execute in isolation, so unless you pass a `session`
     * to `findOne()` you won't see the document until the transaction
     * is committed.
     * result should be undefined or null
     */
    let doc = await numberModel.findOne({number: 15});
    console.log(doc);

    /**
     * This `findOne()` will return the doc, because passing the `session`
     * means this `findOne()` will run as part of the transaction.
     * result should be database json object
     */
    doc = await numberModel.findOne({number: 15}).session(session);
    console.log(doc);

    /**
     * Once the transaction is committed, the write operation becomes
     * visible outside of the transaction.
     */
    await session.commitTransaction();
    doc = await numberModel.findOne({number: 15});
    console.log(doc);

    session.endSession();

    console.log('number updated');
}


exports.removeNumber = async () => {
    /** start mongoose transaction */
    const session = await dbConnection.startSession();
    session.startTransaction();

    /**
     * to use transactions you need to pass the session in update function
     * as option
     */
    await numberModel.findOneAndRemove({number: 15}, {session})

    /**
     * Transactions execute in isolation, so unless you pass a `session`
     * to `findOne()` you won't see the document until the transaction
     * is committed.
     * result should be database json object
     */
    let doc = await numberModel.findOne({number: 15});
    console.log(doc);

    /**
     * This `findOne()` will return the doc, because passing the `session`
     * means this `findOne()` will run as part of the transaction.
     * result should be undefined or null
     */
    doc = await numberModel.findOne({number: 15}).session(session);
    console.log(doc);

    /**
     * Once the transaction is committed, the write operation becomes
     * visible outside of the transaction.
     */
    await session.commitTransaction();
    doc = await numberModel.findOne({number: 15});
    console.log(doc);

    session.endSession();

    console.log('number removed');
}


exports.newNumberOldWay = async () => {
    /** start mongoose transaction */
    const session = await dbConnection.startSession();
    session.startTransaction();

    /**
     * to use transactions you need to pass the session in create function
     * as option
     */
    let newNumber = new numberModel({
        number: 16
    })

    await newNumber.save({session})

    /**
     * Transactions execute in isolation, so unless you pass a `session`
     * to `findOne()` you won't see the document until the transaction
     * is committed.
     * result should be undefined or null
     */
    let doc = await numberModel.findOne({number: 16});
    console.log(doc);

    /**
     * This `findOne()` will return the doc, because passing the `session`
     * means this `findOne()` will run as part of the transaction.
     * result should be database json object
     */
    doc = await numberModel.findOne({number: 16}).session(session);
    console.log(doc);

    /**
     * Once the transaction is committed, the write operation becomes
     * visible outside of the transaction.
     */
    await session.commitTransaction();
    doc = await numberModel.findOne({number: 16});
    console.log(doc);

    console.log('new number saved');


    /**
     * restart transaction
     */
    session.startTransaction();

    /**
     * to use transactions you need to pass the session in update function
     * as option
     */
    await numberModel.findOneAndRemove({number: 16}, {session})

    /**
     * Transactions execute in isolation, so unless you pass a `session`
     * to `findOne()` you won't see the document until the transaction
     * is committed.
     * result should be database json object
     */
    doc = await numberModel.findOne({number: 16});
    console.log(doc);

    /**
     * This `findOne()` will return the doc, because passing the `session`
     * means this `findOne()` will run as part of the transaction.
     * result should be undefined or null
     */
    doc = await numberModel.findOne({number: 16}).session(session);
    console.log(doc);

    /**
     * Once the transaction is committed, the write operation becomes
     * visible outside of the transaction.
     */
    await session.commitTransaction();
    doc = await numberModel.findOne({number: 16});
    console.log(doc);

    session.endSession();

    console.log('number removed instantly');
}