// @flow

import linksController from '../controllers/linksController';
import express from 'express';

module.exports = (app: *) => {
    // links Routes
    app.route('/links')
        .get(linksController.listAllLinks)
        .post(linksController.createLink);

    app.route('/links/:linkId')
        .get(linksController.readLink);
};