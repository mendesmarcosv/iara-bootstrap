// Register Page - Com Endereço e ViaCEP
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { Container } from '../../components/Layout/Container';
import { Button } from '../../components/atoms/Button';
import { fetchAddressByCep } from '../../lib/api/viaCep';
import './Auth.css';

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não coincidem')
    .required('Confirmação de senha é obrigatória'),
  cep: Yup.string()
    .matches(/^\d{5}-\d{3}$/, 'CEP inválido (formato: 00000-000)')
    .required('CEP é obrigatório'),
  address: Yup.string()
    .min(3, 'Endereço deve ter no mínimo 3 caracteres')
    .required('Endereço é obrigatório'),
  number: Yup.string()
    .required('Número é obrigatório'),
  complement: Yup.string(),
  neighborhood: Yup.string()
    .required('Bairro é obrigatório'),
  city: Yup.string()
    .required('Cidade é obrigatória'),
  state: Yup.string()
    .length(2, 'Estado deve ter 2 letras')
    .required('Estado é obrigatório'),
});

export const Register: React.FC = () => {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loadingCep, setLoadingCep] = useState(false);

  // Se já está logado, redireciona para o catálogo
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/catalog', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values: any) => {
    setError(null);
    try {
      // Por enquanto, apenas cria a conta (endereço seria salvo em backend real)
      await register(values.email, values.password);
      
      // Salvar dados de endereço no localStorage (simulação)
      localStorage.setItem('user_address', JSON.stringify({
        cep: values.cep,
        address: values.address,
        number: values.number,
        complement: values.complement,
        neighborhood: values.neighborhood,
        city: values.city,
        state: values.state,
      }));
      
      navigate('/catalog');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta. Tente novamente.');
    }
  };

  const handleCepBlur = async (cep: string, setFieldValue: any) => {
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      return;
    }

    setLoadingCep(true);
    try {
      const addressData = await fetchAddressByCep(cep);
      
      // Preencher campos automaticamente
      setFieldValue('address', addressData.logradouro || '');
      setFieldValue('neighborhood', addressData.bairro || '');
      setFieldValue('city', addressData.localidade || '');
      setFieldValue('state', addressData.uf || '');
    } catch (err: any) {
      console.error('Erro ao buscar CEP:', err);
      setError('CEP não encontrado. Verifique o CEP digitado.');
    } finally {
      setLoadingCep(false);
    }
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d)/, '$1-$2');
    }
    return value;
  };

  return (
    <div className="auth-page">
      <Container maxWidth="md">
        <div className="auth-card">
          <h1 className="auth-title">Criar Conta</h1>
          <p className="auth-subtitle">
            Cadastre-se para acessar nossa biblioteca de jogos
          </p>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
              cep: '',
              address: '',
              number: '',
              complement: '',
              neighborhood: '',
              city: '',
              state: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting, setFieldValue, values }) => (
              <Form className="auth-form register-form">
                <div className="form-section">
                  <h3 className="section-title">Dados de Acesso</h3>

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

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="password">Senha</label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className={`form-input ${
                          errors.password && touched.password ? 'input-error' : ''
                        }`}
                        placeholder="••••••••"
                      />
                      {errors.password && touched.password && (
                        <span className="text-error">{errors.password}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirmar Senha</label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className={`form-input ${
                          errors.confirmPassword && touched.confirmPassword
                            ? 'input-error'
                            : ''
                        }`}
                        placeholder="••••••••"
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <span className="text-error">{errors.confirmPassword}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Endereço</h3>

                  <div className="form-group">
                    <label htmlFor="cep">CEP</label>
                    <Field name="cep">
                      {({ field }: any) => (
                        <input
                          {...field}
                          type="text"
                          id="cep"
                          className={`form-input ${
                            errors.cep && touched.cep ? 'input-error' : ''
                          }`}
                          placeholder="00000-000"
                          maxLength={9}
                          onChange={(e) => {
                            const formatted = formatCEP(e.target.value);
                            setFieldValue('cep', formatted);
                          }}
                          onBlur={(e) => {
                            field.onBlur(e);
                            handleCepBlur(e.target.value, setFieldValue);
                          }}
                        />
                      )}
                    </Field>
                    {loadingCep && <span className="text-info">Buscando CEP...</span>}
                    {errors.cep && touched.cep && (
                      <span className="text-error">{errors.cep}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Endereço</label>
                    <Field
                      type="text"
                      name="address"
                      id="address"
                      className={`form-input ${
                        errors.address && touched.address ? 'input-error' : ''
                      }`}
                      placeholder="Rua, Avenida..."
                    />
                    {errors.address && touched.address && (
                      <span className="text-error">{errors.address}</span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group" style={{ maxWidth: '150px' }}>
                      <label htmlFor="number">Número</label>
                      <Field
                        type="text"
                        name="number"
                        id="number"
                        className={`form-input ${
                          errors.number && touched.number ? 'input-error' : ''
                        }`}
                        placeholder="123"
                      />
                      {errors.number && touched.number && (
                        <span className="text-error">{errors.number}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="complement">Complemento (opcional)</label>
                      <Field
                        type="text"
                        name="complement"
                        id="complement"
                        className="form-input"
                        placeholder="Apto, Bloco..."
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="neighborhood">Bairro</label>
                    <Field
                      type="text"
                      name="neighborhood"
                      id="neighborhood"
                      className={`form-input ${
                        errors.neighborhood && touched.neighborhood ? 'input-error' : ''
                      }`}
                      placeholder="Centro"
                    />
                    {errors.neighborhood && touched.neighborhood && (
                      <span className="text-error">{errors.neighborhood}</span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">Cidade</label>
                      <Field
                        type="text"
                        name="city"
                        id="city"
                        className={`form-input ${
                          errors.city && touched.city ? 'input-error' : ''
                        }`}
                        placeholder="São Paulo"
                      />
                      {errors.city && touched.city && (
                        <span className="text-error">{errors.city}</span>
                      )}
                    </div>

                    <div className="form-group" style={{ maxWidth: '100px' }}>
                      <label htmlFor="state">Estado</label>
                      <Field
                        type="text"
                        name="state"
                        id="state"
                        className={`form-input ${
                          errors.state && touched.state ? 'input-error' : ''
                        }`}
                        placeholder="SP"
                        maxLength={2}
                        style={{ textTransform: 'uppercase' }}
                      />
                      {errors.state && touched.state && (
                        <span className="text-error">{errors.state}</span>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Cadastrar
                </Button>
              </Form>
            )}
          </Formik>

          <div className="auth-footer">
            <p>
              Já tem uma conta?{' '}
              <Link to="/login" className="auth-link">
                Faça login
              </Link>
            </p>
          </div>

          <div className="auth-hint">
            <p className="hint-title">💡 Importante - API de Teste:</p>
            <p className="hint-text">
              O ReqRes API aceita apenas e-mails específicos para registro.
              <br />
              <strong>Use exatamente:</strong> eve.holt@reqres.in
              <br />
              <strong>Senha:</strong> qualquer senha com 6+ caracteres
              <br />
              <br />
              Após registrar, use essas mesmas credenciais para fazer login!
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};
