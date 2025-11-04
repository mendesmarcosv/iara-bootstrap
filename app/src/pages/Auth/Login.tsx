// Login Page
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { Container } from '../../components/Layout/Container';
import { Button } from '../../components/atoms/Button';
import './Auth.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatória'),
});

export const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  
  const redirect = searchParams.get('redirect');

  // Se já está logado, redireciona
  useEffect(() => {
    if (isAuthenticated) {
      const destination = redirect ? `/${redirect}` : '/catalog';
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, navigate, redirect]);

  // Função para limpar dados antigos (debug)
  const handleClearStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    setError(null);
    try {
      await login(values.email, values.password);
      const destination = redirect ? `/${redirect}` : '/catalog';
      navigate(destination);
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <div className="auth-page">
      <Container maxWidth="sm">
        <div className="auth-card">
          <h1 className="auth-title">Entrar</h1>
          <p className="auth-subtitle">
            Entre com sua conta para acessar o catálogo
          </p>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className={`form-input ${
                      errors.email && touched.email ? 'input-error' : ''
                    }`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && touched.email && (
                    <span className="text-error">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Senha</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    className={`form-input ${
                      errors.password && touched.password ? 'input-error' : ''
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.password && touched.password && (
                    <span className="text-error">{errors.password}</span>
                  )}
                </div>

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Entrar
                </Button>
              </Form>
            )}
          </Formik>

          <div className="auth-footer">
            <p>
              Não tem uma conta?{' '}
              <Link to="/register" className="auth-link">
                Cadastre-se
              </Link>
            </p>
          </div>

          <div className="auth-hint">
            <p className="hint-title">💡 Credenciais de Teste:</p>
            <p className="hint-text">
              <strong>E-mail:</strong> eve.holt@reqres.in
              <br />
              <strong>Senha:</strong> qualquer senha com 6+ caracteres
              <br />
              <br />
              (API de teste - ReqRes.in)
            </p>
            <button
              type="button"
              onClick={handleClearStorage}
              style={{
                marginTop: '8px',
                padding: '4px 8px',
                fontSize: '11px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '4px',
                color: 'var(--color-muted)',
                cursor: 'pointer',
              }}
            >
              Limpar cache (se houver problemas)
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

