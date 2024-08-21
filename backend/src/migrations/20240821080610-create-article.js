/**
 * This file is part of the Sandy Andryanto Blog Application.
 *
 * @author     Sandy Andryanto <sandy.andryanto.blade@gmail.com>
 * @copyright  2024
 *
 * For the full copyright and license information,
 * please view the LICENSE.md file that was distributed
 * with this source code.
 */

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface
      .createTable("articles", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED,
        },
        user_id: {
          type: Sequelize.BIGINT.UNSIGNED,
        },
        image: {
          type: Sequelize.STRING(191),
          allowNull: true,
        },
        title: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        slug: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT("long"),
          allowNull: true,
        },
        status: {
          type: Sequelize.TINYINT,
          defaultValue: 0,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() => queryInterface.addIndex("articles", ["user_id"]))
      .then(() => queryInterface.addIndex("articles", ["image"]))
      .then(() => queryInterface.addIndex("articles", ["title"]))
      .then(() => queryInterface.addIndex("articles", ["slug"]))
      .then(() => queryInterface.addIndex("articles", ["description"]))
      .then(() => queryInterface.addIndex("articles", ["status"]))
      .then(() => queryInterface.addIndex("articles", ["created_at"]))
      .then(() => queryInterface.addIndex("articles", ["updated_at"]))
      ;

      await queryInterface.createTable('viewers', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED
        },
        article_id: {
          type: Sequelize.BIGINT.UNSIGNED,
        },
        user_id: {
          type: Sequelize.BIGINT.UNSIGNED,
        },
        status: {
          type: Sequelize.TINYINT,
          defaultValue: 0,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => queryInterface.addIndex('viewers', ['article_id']))
      .then(() => queryInterface.addIndex('viewers', ['user_id']))
      .then(() => queryInterface.addIndex('viewers', ['status']))
      .then(() => queryInterface.addIndex('viewers', ['created_at']))
      .then(() => queryInterface.addIndex('viewers', ['updated_at']))
      ;

      await queryInterface.createTable('articles_categories', {
        article_id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
        },
        category_id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
        },
      })
        .then(() => queryInterface.addIndex('articles_categories', ['article_id']))
        .then(() => queryInterface.addIndex('articles_categories', ['category_id']))
       ;

      await queryInterface.createTable('articles_tags', {
        article_id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
        },
        tag_id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
        },
      })
        .then(() => queryInterface.addIndex('articles_tags', ['article_id']))
        .then(() => queryInterface.addIndex('articles_tags', ['tag_id']))
        ;

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("viewers");
    await queryInterface.dropTable("articles_categories");
    await queryInterface.dropTable("articles_tags");
    await queryInterface.dropTable("articles");
  },
};