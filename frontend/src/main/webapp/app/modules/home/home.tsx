import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
      <Col md="9">
        <h2>Desafio FullStack</h2>
        {account && account.login ? (
          <div>
            <Alert color="success">Você entrou como usuário {account.login}.</Alert>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              Se você deseja
              <span>&nbsp;</span>
              <Link to="/login" className="alert-link">
                {' '}
                entrar
              </Link>
              , use uma das seguintes contas:
              <br />- Administrator (login=&quot;admin&quot; e senha=&quot;admin&quot;)
              <br />- Guest (login=&quot;guest&quot; e senha=&quot;guest&quot;).
            </Alert>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default Home;
