import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import unixTimeToDate from '../utils/dateFormatter';
import extractImageFromBody from '../utils/imageExtractor';

const ArticlesByCriteria = ({ articles, start, end }) => (articles ? (
  articles.slice(start, end).map(article => (
    <div key={article.id}>
      <img src={extractImageFromBody(article.body)} alt="" />
      <h3>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link className="title-link">
          {article.title}
        </Link>
      </h3>
      <span className="author">{article.author.username}</span>
      <br />
      <span className="meta">
        {unixTimeToDate(article.created_at)}
          &nbsp;.&nbsp;
        {article.reading_time}
          &nbsp;read
      </span>
    </div>
  ))
) : (
  <div>Loading...</div>
));

ArticlesByCriteria.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number,
    PropTypes.string, PropTypes.array])),
  start: PropTypes.number,
  end: PropTypes.number,
};

ArticlesByCriteria.defaultProps = {
  articles: [],
  start: 0,
  end: 0,
};
export default ArticlesByCriteria;