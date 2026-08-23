import React, { useEffect, useMemo, useRef, useState } from 'react';

/* =========================================================
   DATOS DE PRUEBA
   ---------------------------------------------------------
   Este componente es una simulación visual. No consulta una
   base de datos real, no crea cobros reales y no solicita
   credenciales bancarias.
========================================================= */

const DEMO_ACCOUNTS = {
  '7724410': {
    documentNumber: '7724410',
    customerName: 'FERNANDO RODRIGUEZ GOMEZ',
    contractNumber: 'INT-7724410',
    invoiceNumber: 'CAP-INT-2026-000772',
    serviceType: 'Internet hogar',
    serviceDescription: 'Plan de internet residencial',
    billingPeriod: 'Julio de 2026',
    dueDate: '5 de agosto de 2026',
    amount: 60000,
    status: 'Pendiente de pago',
  },
  '1044507615': {
    documentNumber: '1044507615',
    customerName: 'ANDRY QUERUBIN LOPERA ',
    contractNumber: 'TV-1044507615',
    invoiceNumber: 'CAP-TV-2026-104450',
    serviceType: 'Televisión por cable',
    serviceDescription: 'Servicio residencial de televisión por cable',
    billingPeriod: 'Julio de 2026',
    dueDate: '5 de agosto de 2026',
    amount: 35000,
    status: 'Pendiente de pago',
  },
};

const PAYMENT_METHODS = [
  {
    id: 'BANCOLOMBIA_BUTTON',
    title: 'Botón Bancolombia',
    description: 'Simulación de pago desde una cuenta Bancolombia.',
    icon: 'fas fa-building-columns',
    badge: 'Recomendado',
  },
  {
    id: 'PSE',
    title: 'PSE',
    description: 'Simulación de transferencia desde una cuenta bancaria.',
    icon: 'fas fa-money-bill-transfer',
    badge: 'Cuenta bancaria',
  },
];

const FLOW_STEPS = [
  { id: 1, label: 'Consulta' },
  { id: 2, label: 'Factura' },
  { id: 3, label: 'Método' },
  { id: 4, label: 'Confirmación' },
  { id: 5, label: 'Banco' },
  { id: 6, label: 'Resultado' },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);

const createSimulationReference = () => {
  const date = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(new Date())
    .replaceAll('-', '');

  const randomPart = window.crypto?.randomUUID
    ? window.crypto.randomUUID().replaceAll('-', '').slice(0, 12).toUpperCase()
    : Math.random().toString(36).slice(2, 14).toUpperCase();

  return `CAPSOS-${date}-${randomPart}`;
};

const createSimulationTransactionId = () => {
  const randomPart = window.crypto?.randomUUID
    ? window.crypto.randomUUID().replaceAll('-', '').toUpperCase()
    : `${Date.now()}${Math.random().toString(36).slice(2)}`.toUpperCase();

  return `SIM-WOMPI-${randomPart}`;
};

const createAuthorizationCode = () =>
  `BCO-SIM-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

const getBogotaDateTime = () =>
  new Intl.DateTimeFormat('es-CO', {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(new Date());

const PaymentStep = ({ number, label, currentStep }) => {
  const completed = currentStep > number;
  const active = currentStep === number;

  return (
    <div
      className={`capsos-pay-step ${completed ? 'completed' : ''} ${
        active ? 'active' : ''
      }`}
    >
      <span className="capsos-pay-step__circle">
        {completed ? <i className="fas fa-check" /> : number}
      </span>
      <span className="capsos-pay-step__label">{label}</span>
    </div>
  );
};

const StatusItem = ({ icon, title, description, state = 'pending' }) => (
  <div className={`capsos-tracking-item ${state}`}>
    <div className="capsos-tracking-icon">
      <i className={icon} />
    </div>

    <div>
      <strong>{title}</strong>
      <span>{description}</span>
    </div>
  </div>
);

const SimulationBadge = () => (
  <div className="capsos-simulation-badge" role="status">
    <i className="fas fa-flask" />
    Entorno de prueba
  </div>
);

const ProcessingModal = ({ isOpen, title, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="capsos-processing-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="capsos-processing-title"
      aria-describedby="capsos-processing-description"
    >
      <div className="capsos-processing-modal__backdrop" />

      <div className="capsos-processing-modal__card">
        <div className="capsos-processing-modal__brand">
          <span className="capsos-processing-modal__brand-icon">
            <i className="fas fa-shield-halved" />
          </span>
          <span>CAPSOS Pagos</span>
        </div>

        <div className="capsos-processing-modal__spinner" aria-hidden="true">
          <span />
          <i className="fas fa-lock" />
        </div>

        <h3 id="capsos-processing-title">{title}</h3>
        <p id="capsos-processing-description">{message}</p>

        <div
          className="capsos-processing-modal__progress"
          role="progressbar"
          aria-label="Procesando solicitud"
        >
          <span />
        </div>

        <div className="capsos-processing-modal__status">
          <span className="capsos-processing-modal__pulse" />
          Procesando de forma segura
        </div>

        <small>Por favor, no cierres ni actualices esta ventana.</small>
      </div>
    </div>
  );
};

const PagoEnLinea = () => {
  const timerRef = useRef([]);

  /*
   * Al abrir la ruta /pagos desde el footer, React Router conserva
   * la posición anterior del scroll. Este efecto obliga a que el
   * portal de pagos siempre comience desde la parte superior.
   */
  useEffect(() => {
    const previousScrollRestoration =
      'scrollRestoration' in window.history
        ? window.history.scrollRestoration
        : null;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);

    const animationFrame = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);

      if (
        'scrollRestoration' in window.history &&
        previousScrollRestoration !== null
      ) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [documentNumber, setDocumentNumber] = useState('');
  const [account, setAccount] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('BANCOLOMBIA_BUTTON');
  const [payerEmail, setPayerEmail] = useState('');
  const [payerPhone, setPayerPhone] = useState('');
  const [acceptsTerms, setAcceptsTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [transaction, setTransaction] = useState(null);
  const [gatewayState, setGatewayState] = useState('IDLE');
  const [bankConnected, setBankConnected] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [processingAction, setProcessingAction] = useState(null);
  const [processingMessage, setProcessingMessage] = useState('');

  useEffect(() => {
    return () => {
      timerRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const selectedMethodInfo = useMemo(
    () => PAYMENT_METHODS.find((method) => method.id === selectedMethod),
    [selectedMethod]
  );

  const progress = useMemo(
    () => ((currentStep - 1) / (FLOW_STEPS.length - 1)) * 100,
    [currentStep]
  );

  const transactionPayload = useMemo(() => {
    if (!account || !transaction) {
      return null;
    }

    return {
      environment: 'SIMULATION',
      reference: transaction.reference,
      amount_in_cents: account.amount * 100,
      currency: 'COP',
      customer_email: payerEmail,
      payment_method: {
        type: selectedMethod,
        user_type: 'PERSON',
      },
      acceptance_token: 'SIMULATED_ACCEPTANCE_TOKEN',
      accept_personal_auth: 'SIMULATED_PERSONAL_DATA_TOKEN',
      redirect_url:
        'https://capsos.com.co/pagos/resultado?transaction_id=SIMULACION',
      signature_integrity: 'GENERATED_ONLY_ON_A_REAL_SECURE_BACKEND',
    };
  }, [account, payerEmail, selectedMethod, transaction]);

  const gatewayIsProcessing = [
    'CREATING_TRANSACTION',
    'TRANSACTION_CREATED',
    'REDIRECTING_TO_BANK',
    'PROCESSING_BANK_RESPONSE',
  ].includes(gatewayState);

  const isProcessing = Boolean(processingAction) || gatewayIsProcessing;

  const activeProcessingMessage = useMemo(() => {
    if (processingMessage) {
      return processingMessage;
    }

    const messages = {
      CREATING_TRANSACTION: 'Creando la transacción...',
      TRANSACTION_CREATED: 'Preparando la conexión bancaria...',
      REDIRECTING_TO_BANK: 'Estableciendo conexión con la entidad financiera...',
      PROCESSING_BANK_RESPONSE: 'Procesando la respuesta bancaria...',
    };

    return messages[gatewayState] || '';
  }, [gatewayState, processingMessage]);

  const processingModalContent = useMemo(() => {
    if (processingAction === 'LOOKUP') {
      return {
        title: 'Consultando tu factura',
        message:
          activeProcessingMessage ||
          'Estamos validando el documento y localizando la factura asociada.',
      };
    }

    if (processingAction === 'TO_METHOD') {
      return {
        title: 'Cargando medios de pago',
        message:
          activeProcessingMessage ||
          'Estamos preparando las opciones disponibles para continuar con el pago.',
      };
    }

    if (processingAction === 'TO_CONFIRMATION') {
      return {
        title: 'Validando la información',
        message:
          activeProcessingMessage ||
          'Estamos verificando el medio seleccionado y preparando el resumen del pago.',
      };
    }

    const gatewayContent = {
      CREATING_TRANSACTION: {
        title: 'Creando la transacción',
        message:
          'Estamos generando la referencia y preparando la solicitud de pago.',
      },
      TRANSACTION_CREATED: {
        title: 'Validando la transacción',
        message:
          'La referencia fue creada. Estamos verificando los datos antes de continuar.',
      },
      REDIRECTING_TO_BANK: {
        title: 'Conectando con el banco',
        message:
          'Estamos estableciendo una conexión segura con la entidad financiera.',
      },
      PROCESSING_BANK_RESPONSE: {
        title: 'Procesando la autorización',
        message:
          'Estamos validando la respuesta de la entidad financiera y actualizando el pago.',
      },
    };

    return (
      gatewayContent[gatewayState] || {
        title: 'Procesando información',
        message:
          activeProcessingMessage ||
          'Espera un momento mientras completamos la solicitud.',
      }
    );
  }, [activeProcessingMessage, gatewayState, processingAction]);

  useEffect(() => {
    if (!isProcessing) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isProcessing]);

  const clearTimers = () => {
    timerRef.current.forEach((timer) => window.clearTimeout(timer));
    timerRef.current = [];
  };

  const schedule = (callback, delay) => {
    const timer = window.setTimeout(callback, delay);
    timerRef.current.push(timer);
    return timer;
  };

  const runStepTransition = ({
    action,
    message,
    duration = 850,
    onComplete,
  }) => {
    if (isProcessing) {
      return;
    }

    setErrorMessage('');
    setProcessingAction(action);
    setProcessingMessage(message);

    schedule(() => {
      onComplete();
      setProcessingAction(null);
      setProcessingMessage('');
    }, duration);
  };

  const handleDocumentChange = (event) => {
    const value = event.target.value.replace(/\D/g, '').slice(0, 15);
    setDocumentNumber(value);
    setErrorMessage('');
  };

  const handleLookup = (event) => {
    event.preventDefault();
    setErrorMessage('');
    setPaymentResult(null);

    const normalizedDocument = documentNumber.trim();
    const foundAccount = DEMO_ACCOUNTS[normalizedDocument];

    if (!normalizedDocument) {
      setErrorMessage('Ingresa un número de documento para consultar.');
      return;
    }

    if (!foundAccount) {
      setAccount(null);
      setErrorMessage(
        'No se encontró una factura de demostración. Usa 7724410 o 1044507615.'
      );
      return;
    }

    runStepTransition({
      action: 'LOOKUP',
      message: 'Consultando la factura asociada al documento...',
      duration: 1050,
      onComplete: () => {
        setAccount(foundAccount);
        setCurrentStep(2);
      },
    });
  };

  const handleContinueToPaymentMethod = () => {
    runStepTransition({
      action: 'TO_METHOD',
      message: 'Preparando los medios de pago disponibles...',
      duration: 850,
      onComplete: () => {
        setCurrentStep(3);
      },
    });
  };

  const handleContinueToConfirmation = () => {
    if (!selectedMethod) {
      setErrorMessage('Selecciona un método de pago.');
      return;
    }

    runStepTransition({
      action: 'TO_CONFIRMATION',
      message: 'Preparando el resumen y la confirmación del pago...',
      duration: 850,
      onComplete: () => {
        setCurrentStep(4);
      },
    });
  };

  const handleCreateTransaction = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9+\s()-]{7,20}$/;

    if (!emailPattern.test(payerEmail.trim())) {
      setErrorMessage('Ingresa un correo electrónico válido.');
      return;
    }

    if (payerPhone && !phonePattern.test(payerPhone.trim())) {
      setErrorMessage('Ingresa un teléfono válido o deja el campo vacío.');
      return;
    }

    if (!acceptsTerms) {
      setErrorMessage(
        'Debes aceptar las condiciones de la simulación para continuar.'
      );
      return;
    }

    clearTimers();
    setErrorMessage('');
    setGatewayState('CREATING_TRANSACTION');

    const newTransaction = {
      id: createSimulationTransactionId(),
      reference: createSimulationReference(),
      status: 'PENDING',
      createdAt: getBogotaDateTime(),
      amount: account.amount,
      method: selectedMethod,
    };

    setTransaction(newTransaction);

    schedule(() => {
      setGatewayState('TRANSACTION_CREATED');
    }, 900);

    schedule(() => {
      setGatewayState('AWAITING_BANK');
      setCurrentStep(5);
    }, 1800);
  };

  const handleConnectToBank = () => {
    setGatewayState('REDIRECTING_TO_BANK');

    schedule(() => {
      setBankConnected(true);
      setGatewayState('BANK_AUTHORIZATION');
    }, 1200);
  };

  const handleSimulateBankResponse = (result) => {
    setGatewayState('PROCESSING_BANK_RESPONSE');

    schedule(() => {
      const approved = result === 'APPROVED';

      const finalResult = {
        status: result,
        title: approved ? 'Pago aprobado' : 'Pago rechazado',
        message: approved
          ? 'La entidad financiera confirmó la autorización del pago simulado.'
          : 'La entidad financiera rechazó el pago simulado. No se aplicó ningún cobro.',
        authorizationCode: approved ? createAuthorizationCode() : 'NO APLICA',
        processedAt: getBogotaDateTime(),
      };

      setTransaction((previousTransaction) => ({
        ...previousTransaction,
        status: result,
      }));
      setPaymentResult(finalResult);
      setGatewayState(result);
      setCurrentStep(6);
    }, 1600);
  };

  const handleReset = () => {
    clearTimers();
    setCurrentStep(1);
    setDocumentNumber('');
    setAccount(null);
    setSelectedMethod('BANCOLOMBIA_BUTTON');
    setPayerEmail('');
    setPayerPhone('');
    setAcceptsTerms(false);
    setErrorMessage('');
    setTransaction(null);
    setGatewayState('IDLE');
    setBankConnected(false);
    setPaymentResult(null);
    setProcessingAction(null);
    setProcessingMessage('');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (isProcessing) {
      return;
    }

    setErrorMessage('');

    if (currentStep === 2) {
      setAccount(null);
    }

    if (currentStep === 5) {
      clearTimers();
      setGatewayState('IDLE');
      setTransaction(null);
      setBankConnected(false);
    }

    setCurrentStep((step) => Math.max(1, step - 1));
  };

  const getTrackingState = (stage) => {
    if (stage === 'lookup') {
      return account ? 'completed' : currentStep === 1 ? 'active' : 'pending';
    }

    if (stage === 'transaction') {
      if (transaction) return 'completed';
      return currentStep >= 4 ? 'active' : 'pending';
    }

    if (stage === 'bank') {
      if (bankConnected || currentStep === 6) return 'completed';
      return currentStep === 5 ? 'active' : 'pending';
    }

    if (stage === 'response') {
      if (paymentResult) return 'completed';
      return gatewayState === 'PROCESSING_BANK_RESPONSE' ? 'active' : 'pending';
    }

    if (stage === 'application') {
      if (paymentResult?.status === 'APPROVED') return 'completed';
      if (paymentResult?.status === 'DECLINED') return 'failed';
      return 'pending';
    }

    return 'pending';
  };

  const renderLookupStep = () => (
    <div className="capsos-payment-card">
      <div className="capsos-payment-card__header">
        <span className="capsos-payment-card__icon">
          <i className="fas fa-magnifying-glass-dollar" />
        </span>

        <div>
          <span className="capsos-payment-eyebrow">Paso 1</span>
          <h2>Consulta tu factura</h2>
          <p>
            Ingresa el documento asociado al servicio para consultar el valor
            pendiente.
          </p>
        </div>
      </div>

      <form onSubmit={handleLookup} className="capsos-payment-form">
        <label htmlFor="payment-document">Documento del titular</label>

        <div className="capsos-payment-input-group">
          <span>
            <i className="fas fa-id-card" />
          </span>

          <input
            id="payment-document"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Número de documento"
            value={documentNumber}
            onChange={handleDocumentChange}
          />
        </div>

        <div className="capsos-demo-data">
          <strong>Consulta segura</strong>
          El número ingresado se utiliza únicamente para localizar la factura asociada.
        </div>

        <button
          type="submit"
          className="capsos-payment-primary-button"
          disabled={isProcessing}
        >
          {processingAction === 'LOOKUP' ? (
            <>
              <span className="capsos-button-spinner" />
              Consultando factura...
            </>
          ) : (
            <>
              Consultar factura
              <i className="fas fa-arrow-right" />
            </>
          )}
        </button>
      </form>
    </div>
  );

  const renderInvoiceStep = () => (
    <div className="capsos-payment-card">
      <div className="capsos-payment-card__header">
        <span className="capsos-payment-card__icon">
          <i className="fas fa-file-invoice-dollar" />
        </span>

        <div>
          <span className="capsos-payment-eyebrow">Paso 2</span>
          <h2>Factura encontrada</h2>
          <p>Verifica la información antes de iniciar el pago.</p>
        </div>
      </div>

      <div className="capsos-invoice-summary">
        <div className="capsos-invoice-summary__top">
          <div>
            <span>Servicio</span>
            <strong>{account.serviceType}</strong>
            <small>{account.serviceDescription}</small>
          </div>

          <span className="capsos-status-pill pending">Pendiente</span>
        </div>

        <div className="capsos-invoice-grid">
          <div>
            <span>Titular</span>
            <strong>{account.customerName}</strong>
          </div>
          <div>
            <span>Documento</span>
            <strong>{account.documentNumber}</strong>
          </div>
          <div>
            <span>Contrato</span>
            <strong>{account.contractNumber}</strong>
          </div>
          <div>
            <span>Factura</span>
            <strong>{account.invoiceNumber}</strong>
          </div>
          <div>
            <span>Periodo</span>
            <strong>{account.billingPeriod}</strong>
          </div>
          <div>
            <span>Fecha límite</span>
            <strong>{account.dueDate}</strong>
          </div>
        </div>

        <div className="capsos-invoice-total">
          <span>Total a pagar</span>
          <strong>{formatCurrency(account.amount)}</strong>
          <small>Valor expresado en pesos colombianos</small>
        </div>
      </div>

      <div className="capsos-payment-actions">
        <button
          type="button"
          className="capsos-payment-secondary-button"
          onClick={handleBack}
          disabled={isProcessing}
        >
          <i className="fas fa-arrow-left" />
          Cambiar documento
        </button>

        <button
          type="button"
          className="capsos-payment-primary-button"
          onClick={handleContinueToPaymentMethod}
          disabled={isProcessing}
        >
          {processingAction === 'TO_METHOD' ? (
            <>
              <span className="capsos-button-spinner" />
              Preparando métodos...
            </>
          ) : (
            <>
              Pagar factura
              <i className="fas fa-arrow-right" />
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderMethodStep = () => (
    <div className="capsos-payment-card">
      <div className="capsos-payment-card__header">
        <span className="capsos-payment-card__icon">
          <i className="fas fa-wallet" />
        </span>

        <div>
          <span className="capsos-payment-eyebrow">Paso 3</span>
          <h2>Selecciona el medio de pago</h2>
          <p>La demostración continúa hasta el punto de conexión bancaria.</p>
        </div>
      </div>

      <div className="capsos-payment-methods">
        {PAYMENT_METHODS.map((method) => (
          <label
            className={`capsos-method-card ${
              selectedMethod === method.id ? 'selected' : ''
            }`}
            key={method.id}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={(event) => setSelectedMethod(event.target.value)}
            />

            <span className="capsos-method-card__icon">
              <i className={method.icon} />
            </span>

            <span className="capsos-method-card__content">
              <span className="capsos-method-card__badge">{method.badge}</span>
              <strong>{method.title}</strong>
              <small>{method.description}</small>
            </span>

            <span className="capsos-method-card__check">
              <i className="fas fa-circle-check" />
            </span>
          </label>
        ))}
      </div>

      <div className="capsos-security-note">
        <i className="fas fa-shield-halved" />
        <div>
          <strong>Conexión bancaria simulada</strong>
          <p>
            Este prototipo nunca solicitará usuario, clave, número de cuenta,
            clave dinámica ni información confidencial del banco.
          </p>
        </div>
      </div>

      <div className="capsos-payment-actions">
        <button
          type="button"
          className="capsos-payment-secondary-button"
          onClick={handleBack}
          disabled={isProcessing}
        >
          <i className="fas fa-arrow-left" />
          Volver
        </button>

        <button
          type="button"
          className="capsos-payment-primary-button"
          onClick={handleContinueToConfirmation}
          disabled={isProcessing}
        >
          {processingAction === 'TO_CONFIRMATION' ? (
            <>
              <span className="capsos-button-spinner" />
              Preparando confirmación...
            </>
          ) : (
            <>
              Continuar
              <i className="fas fa-arrow-right" />
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="capsos-payment-card">
      <div className="capsos-payment-card__header">
        <span className="capsos-payment-card__icon">
          <i className="fas fa-clipboard-check" />
        </span>

        <div>
          <span className="capsos-payment-eyebrow">Paso 4</span>
          <h2>Confirma los datos del pago</h2>
          <p>La pasarela utilizaría esta información para crear la transacción.</p>
        </div>
      </div>

      <div className="capsos-confirmation-layout">
        <div className="capsos-confirmation-form">
          <label htmlFor="payer-email">Correo para el comprobante *</label>
          <input
            id="payer-email"
            type="email"
            placeholder="cliente@correo.com"
            value={payerEmail}
            onChange={(event) => {
              setPayerEmail(event.target.value);
              setErrorMessage('');
            }}
          />

          <label htmlFor="payer-phone">Teléfono</label>
          <input
            id="payer-phone"
            type="tel"
            placeholder="300 000 0000"
            value={payerPhone}
            onChange={(event) => {
              setPayerPhone(event.target.value);
              setErrorMessage('');
            }}
          />

          <label className="capsos-payment-consent">
            <input
              type="checkbox"
              checked={acceptsTerms}
              onChange={(event) => {
                setAcceptsTerms(event.target.checked);
                setErrorMessage('');
              }}
            />
            <span>
              Entiendo que este ejercicio es una simulación visual y que no se
              realizará ningún débito real.
            </span>
          </label>
        </div>

        <aside className="capsos-payment-order">
          <span>Resumen del pago</span>
          <strong>{account.serviceType}</strong>

          <div>
            <span>Factura</span>
            <b>{account.invoiceNumber}</b>
          </div>
          <div>
            <span>Método</span>
            <b>{selectedMethodInfo.title}</b>
          </div>
          <div>
            <span>Subtotal</span>
            <b>{formatCurrency(account.amount)}</b>
          </div>
          <div>
            <span>Costo de simulación</span>
            <b>{formatCurrency(0)}</b>
          </div>

          <div className="capsos-payment-order__total">
            <span>Total</span>
            <strong>{formatCurrency(account.amount)}</strong>
          </div>
        </aside>
      </div>

      {gatewayState === 'CREATING_TRANSACTION' ||
      gatewayState === 'TRANSACTION_CREATED' ? (
        <div className="capsos-processing-box">
          <span className="capsos-spinner" />
          <div>
            <strong>
              {gatewayState === 'CREATING_TRANSACTION'
                ? 'Creando transacción simulada'
                : 'Transacción creada correctamente'}
            </strong>
            <p>
              Preparando la redirección segura hacia la entidad financiera.
            </p>
          </div>
        </div>
      ) : null}

      <div className="capsos-payment-actions">
        <button
          type="button"
          className="capsos-payment-secondary-button"
          onClick={handleBack}
          disabled={isProcessing}
        >
          <i className="fas fa-arrow-left" />
          Volver
        </button>

        <button
          type="button"
          className="capsos-payment-primary-button"
          onClick={handleCreateTransaction}
          disabled={isProcessing}
        >
          {gatewayState !== 'IDLE' ? (
            <>
              <span className="capsos-button-spinner" />
              Preparando pago...
            </>
          ) : (
            <>
              Crear transacción
              <i className="fas fa-lock" />
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderBankStep = () => (
    <div className="capsos-payment-card">
      <div className="capsos-payment-card__header">
        <span className="capsos-payment-card__icon">
          <i className="fas fa-building-columns" />
        </span>

        <div>
          <span className="capsos-payment-eyebrow">Paso 5</span>
          <h2>Conexión con Bancolombia</h2>
          <p>
            Punto de entrega entre la pasarela simulada y la entidad financiera.
          </p>
        </div>
      </div>

      {!bankConnected ? (
        <div className="capsos-bank-handoff">
          <div className="capsos-bank-handoff__route">
            <div>
              <span className="capsos-route-logo capsos-route-logo--capsos">
                <i className="fas fa-wifi" />
              </span>
              <strong>CAPSOS</strong>
              <small>Comercio</small>
            </div>

            <span className="capsos-route-line">
              <i className="fas fa-lock" />
            </span>

            <div>
              <span className="capsos-route-logo capsos-route-logo--gateway">
                <i className="fas fa-shield-halved" />
              </span>
              <strong>Pasarela</strong>
              <small>Simulada</small>
            </div>

            <span className="capsos-route-line">
              <i className="fas fa-arrow-right" />
            </span>

            <div>
              <span className="capsos-route-logo capsos-route-logo--bank">
                <i className="fas fa-building-columns" />
              </span>
              <strong>Bancolombia</strong>
              <small>Conexión</small>
            </div>
          </div>

          <div className="capsos-bank-transaction-box">
            <div>
              <span>Referencia</span>
              <strong>{transaction.reference}</strong>
            </div>
            <div>
              <span>Transacción</span>
              <strong>{transaction.id}</strong>
            </div>
            <div>
              <span>Valor</span>
              <strong>{formatCurrency(account.amount)}</strong>
            </div>
            <div>
              <span>Estado</span>
              <strong>Pendiente de autorización</strong>
            </div>
          </div>

          <div className="capsos-bank-warning">
            <i className="fas fa-triangle-exclamation" />
            <div>
              <strong>Fin del entorno CAPSOS</strong>
              <p>
                En una integración real, desde este punto el cliente sería
                redirigido al canal oficial del banco. CAPSOS no debe capturar
                credenciales, claves ni códigos bancarios.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="capsos-payment-primary-button capsos-full-button"
            onClick={handleConnectToBank}
            disabled={isProcessing}
          >
            {gatewayState === 'REDIRECTING_TO_BANK' ? (
              <>
                <span className="capsos-button-spinner" />
                Estableciendo conexión...
              </>
            ) : (
              <>
                Continuar a Bancolombia — simulación
                <i className="fas fa-arrow-up-right-from-square" />
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="capsos-bank-simulator">
          <div className="capsos-bank-simulator__header">
            <div>
              <span className="capsos-bank-simulator__logo">
                <i className="fas fa-building-columns" />
              </span>
              <div>
                <span>ENTORNO DE PRUEBA</span>
                <strong>Autorización bancaria simulada</strong>
              </div>
            </div>

            <span className="capsos-status-pill connected">
              <i className="fas fa-link" />
              Conectado
            </span>
          </div>

          <div className="capsos-bank-simulator__notice">
            <i className="fas fa-circle-info" />
            <p>
              Esta pantalla no pertenece a Bancolombia y no solicita información
              financiera. Solo representa la respuesta que recibiría la pasarela.
            </p>
          </div>

          <div className="capsos-bank-simulator__payment">
            <div>
              <span>Comercio</span>
              <strong>CAPSOS Telecomunicaciones</strong>
            </div>
            <div>
              <span>Concepto</span>
              <strong>{account.serviceType}</strong>
            </div>
            <div>
              <span>Referencia</span>
              <strong>{transaction.reference}</strong>
            </div>
            <div>
              <span>Valor a autorizar</span>
              <strong>{formatCurrency(account.amount)}</strong>
            </div>
          </div>

          {gatewayState === 'PROCESSING_BANK_RESPONSE' ? (
            <div className="capsos-processing-box">
              <span className="capsos-spinner" />
              <div>
                <strong>Procesando respuesta bancaria</strong>
                <p>Actualizando el estado de la transacción simulada.</p>
              </div>
            </div>
          ) : (
            <div className="capsos-bank-simulator__buttons">
              <button
                type="button"
                className="capsos-payment-secondary-button capsos-danger-button"
                onClick={() => handleSimulateBankResponse('DECLINED')}
                disabled={isProcessing}
              >
                <i className="fas fa-xmark" />
                Simular rechazo
              </button>

              <button
                type="button"
                className="capsos-payment-primary-button"
                onClick={() => handleSimulateBankResponse('APPROVED')}
                disabled={isProcessing}
              >
                Simular autorización
                <i className="fas fa-check" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderResultStep = () => {
    const approved = paymentResult?.status === 'APPROVED';

    return (
      <div className="capsos-payment-card">
        <div
          className={`capsos-payment-result ${approved ? 'approved' : 'declined'}`}
        >
          <span className="capsos-payment-result__icon">
            <i className={approved ? 'fas fa-circle-check' : 'fas fa-circle-xmark'} />
          </span>

          <span className="capsos-payment-eyebrow">Paso 6</span>
          <h2>{paymentResult.title}</h2>
          <p>{paymentResult.message}</p>

          <div className="capsos-result-reference">
            <span>Referencia de seguimiento</span>
            <strong>{transaction.reference}</strong>
          </div>
        </div>

        <div className="capsos-result-grid">
          <div>
            <span>Servicio</span>
            <strong>{account.serviceType}</strong>
          </div>
          <div>
            <span>Factura</span>
            <strong>{account.invoiceNumber}</strong>
          </div>
          <div>
            <span>Valor</span>
            <strong>{formatCurrency(account.amount)}</strong>
          </div>
          <div>
            <span>Método</span>
            <strong>{selectedMethodInfo.title}</strong>
          </div>
          <div>
            <span>Autorización</span>
            <strong>{paymentResult.authorizationCode}</strong>
          </div>
          <div>
            <span>Fecha</span>
            <strong>{paymentResult.processedAt}</strong>
          </div>
        </div>

        <div className="capsos-payment-actions capsos-result-actions">
          <button
            type="button"
            className="capsos-payment-secondary-button"
            onClick={() => window.print()}
          >
            <i className="fas fa-print" />
            Imprimir resultado
          </button>

          <button
            type="button"
            className="capsos-payment-primary-button"
            onClick={handleReset}
          >
            Nueva simulación
            <i className="fas fa-rotate-right" />
          </button>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderLookupStep();
      case 2:
        return renderInvoiceStep();
      case 3:
        return renderMethodStep();
      case 4:
        return renderConfirmationStep();
      case 5:
        return renderBankStep();
      case 6:
        return renderResultStep();
      default:
        return null;
    }
  };

  return (
    <main className="capsos-payment-page" id="pago-en-linea">
      <style>{paymentStyles}</style>

      <ProcessingModal
        isOpen={isProcessing}
        title={processingModalContent.title}
        message={processingModalContent.message}
      />

      <section className="capsos-payment-hero">
        <div className="container">
          <SimulationBadge />

          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="capsos-payment-kicker">Portal transaccional</span>
              <h1>Paga tu factura en línea</h1>
              <p>
                Consulta tu factura, selecciona el medio de pago y completa el
                proceso de forma rápida y organizada.
              </p>
            </div>

            <div className="col-lg-5">
              <div className="capsos-payment-hero__security">
                <i className="fas fa-shield-halved" />
                <div>
                  <strong>Conexión protegida</strong>
                  <span>
                    La información bancaria se gestiona únicamente en el canal
                    autorizado de la entidad financiera.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="capsos-payment-content">
        <div className="container">
          <div className="capsos-payment-stepper">
            <div className="capsos-payment-stepper__line">
              <span style={{ width: `${progress}%` }} />
            </div>

            {FLOW_STEPS.map((step) => (
              <PaymentStep
                key={step.id}
                number={step.id}
                label={step.label}
                currentStep={currentStep}
              />
            ))}
          </div>

          {errorMessage && (
            <div className="capsos-payment-alert" role="alert">
              <i className="fas fa-circle-exclamation" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="row g-4 align-items-start">
            <div className="col-xl-8">{renderCurrentStep()}</div>

            <aside className="col-xl-4">
              <div className="capsos-tracking-panel">
                <div className="capsos-tracking-panel__header">
                  <span>
                    <i className="fas fa-route" />
                  </span>
                  <div>
                    <strong>Seguimiento del pago</strong>
                    <small>Estados del proceso simulado</small>
                  </div>
                </div>

                <div className="capsos-tracking-list">
                  <StatusItem
                    icon="fas fa-magnifying-glass"
                    title="Factura consultada"
                    description={account ? account.invoiceNumber : 'Pendiente'}
                    state={getTrackingState('lookup')}
                  />
                  <StatusItem
                    icon="fas fa-receipt"
                    title="Transacción creada"
                    description={transaction ? transaction.reference : 'Pendiente'}
                    state={getTrackingState('transaction')}
                  />
                  <StatusItem
                    icon="fas fa-building-columns"
                    title="Conexión bancaria"
                    description={bankConnected ? 'Conexión simulada realizada' : 'Pendiente'}
                    state={getTrackingState('bank')}
                  />
                  <StatusItem
                    icon="fas fa-arrows-rotate"
                    title="Respuesta del banco"
                    description={paymentResult ? paymentResult.title : 'Pendiente'}
                    state={getTrackingState('response')}
                  />
                  <StatusItem
                    icon="fas fa-circle-check"
                    title="Aplicación del pago"
                    description={
                      paymentResult?.status === 'APPROVED'
                        ? 'Pago simulado aplicado'
                        : paymentResult?.status === 'DECLINED'
                          ? 'No aplicado'
                          : 'Pendiente'
                    }
                    state={getTrackingState('application')}
                  />
                </div>

                {transactionPayload && (
                  <details className="capsos-technical-preview">
                    <summary>
                      <i className="fas fa-code" />
                      Ver datos técnicos simulados
                    </summary>
                    <pre>{JSON.stringify(transactionPayload, null, 2)}</pre>
                  </details>
                )}

                
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

const paymentStyles = `
  .capsos-payment-page {
    --pay-primary: #0b4a6f;
    --pay-primary-hover: #083b59;
    --pay-accent: #0ea5b7;
    --pay-success: #16815d;
    --pay-warning: #a66a00;
    --pay-danger: #b64036;
    --pay-text: #17242d;
    --pay-muted: #6d7c86;
    --pay-border: #dfe6ea;
    --pay-soft: #f6f8f9;
    --pay-white: #ffffff;
    min-height: 100vh;
    padding-top: 84px;
    color: var(--pay-text);
    background: #f7f9fa;
    font-family: inherit;
  }

  .capsos-payment-page *,
  .capsos-payment-page *::before,
  .capsos-payment-page *::after { box-sizing: border-box; }

  .capsos-processing-modal {
    position: fixed;
    inset: 0;
    z-index: 20000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 22px;
  }

  .capsos-processing-modal__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(10, 27, 39, .52);
    backdrop-filter: blur(5px);
    animation: capsosModalFadeIn .22s ease both;
  }

  .capsos-processing-modal__card {
    position: relative;
    z-index: 1;
    width: min(100%, 430px);
    padding: 30px 30px 26px;
    border: 1px solid rgba(223, 230, 234, .95);
    border-radius: 18px;
    background: #fff;
    box-shadow: 0 28px 80px rgba(7, 31, 46, .28);
    text-align: center;
    animation: capsosModalEnter .28s ease both;
  }

  .capsos-processing-modal__brand {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
    color: var(--pay-primary);
    font-size: .72rem;
    font-weight: 800;
    letter-spacing: .07em;
    text-transform: uppercase;
  }

  .capsos-processing-modal__brand-icon {
    display: inline-flex;
    width: 28px;
    height: 28px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: #fff;
    background: var(--pay-primary);
    font-size: .72rem;
  }

  .capsos-processing-modal__spinner {
    position: relative;
    display: inline-flex;
    width: 76px;
    height: 76px;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    border-radius: 50%;
    color: var(--pay-primary);
    background: #f1f8fa;
  }

  .capsos-processing-modal__spinner > span {
    position: absolute;
    inset: 0;
    border: 4px solid #dcebee;
    border-top-color: var(--pay-accent);
    border-right-color: var(--pay-primary);
    border-radius: 50%;
    animation: capsosModalSpin .8s linear infinite;
  }

  .capsos-processing-modal__spinner > i {
    position: relative;
    z-index: 1;
    font-size: 1.25rem;
  }

  .capsos-processing-modal__card h3 {
    margin: 0 0 9px;
    color: var(--pay-text);
    font-size: 1.3rem;
    line-height: 1.25;
    font-weight: 800;
    letter-spacing: -.02em;
  }

  .capsos-processing-modal__card p {
    max-width: 340px;
    margin: 0 auto;
    color: var(--pay-muted);
    font-size: .86rem;
    line-height: 1.6;
  }

  .capsos-processing-modal__progress {
    position: relative;
    width: 100%;
    height: 8px;
    margin: 24px 0 15px;
    overflow: hidden;
    border-radius: 999px;
    background: #e8eff2;
  }

  .capsos-processing-modal__progress > span {
    position: absolute;
    inset: 0 auto 0 0;
    width: 42%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      var(--pay-primary),
      var(--pay-accent),
      #55d2dc
    );
    box-shadow: 0 0 12px rgba(14, 165, 183, .32);
    animation: capsosModalProgress 1.25s ease-in-out infinite;
  }

  .capsos-processing-modal__status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #526872;
    font-size: .75rem;
    font-weight: 700;
  }

  .capsos-processing-modal__pulse {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--pay-success);
    box-shadow: 0 0 0 0 rgba(22, 129, 93, .34);
    animation: capsosModalPulse 1.4s ease-out infinite;
  }

  .capsos-processing-modal__card small {
    display: block;
    margin-top: 15px;
    color: #8a979e;
    font-size: .69rem;
  }

  @keyframes capsosModalSpin {
    to { transform: rotate(360deg); }
  }

  @keyframes capsosModalProgress {
    0% {
      width: 24%;
      transform: translateX(-105%);
    }
    55% {
      width: 55%;
    }
    100% {
      width: 30%;
      transform: translateX(335%);
    }
  }

  @keyframes capsosModalPulse {
    0% { box-shadow: 0 0 0 0 rgba(22, 129, 93, .34); }
    70% { box-shadow: 0 0 0 8px rgba(22, 129, 93, 0); }
    100% { box-shadow: 0 0 0 0 rgba(22, 129, 93, 0); }
  }

  @keyframes capsosModalFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes capsosModalEnter {
    from {
      opacity: 0;
      transform: translateY(12px) scale(.975);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .capsos-payment-hero {
    padding: 34px 0 78px;
    color: var(--pay-text);
    background: #fff;
    border-bottom: 1px solid var(--pay-border);
  }

  .capsos-simulation-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 18px;
    padding: 6px 10px;
    border: 1px solid #cfe1e7;
    border-radius: 999px;
    color: #45616f;
    background: #f5fafb;
    font-size: .72rem;
    font-weight: 700;
  }

  .capsos-payment-kicker,
  .capsos-payment-eyebrow {
    display: block;
    margin-bottom: 7px;
    color: var(--pay-accent);
    font-size: .7rem;
    font-weight: 800;
    letter-spacing: .1em;
    text-transform: uppercase;
  }

  .capsos-payment-hero h1 {
    max-width: 720px;
    margin: 0 0 12px;
    font-size: clamp(1.85rem, 4vw, 2.8rem);
    line-height: 1.08;
    letter-spacing: -.035em;
    font-weight: 800;
  }

  .capsos-payment-hero p {
    max-width: 710px;
    margin: 0;
    color: var(--pay-muted);
    font-size: .98rem;
    line-height: 1.7;
  }

  .capsos-payment-hero__security {
    display: flex;
    align-items: flex-start;
    gap: 13px;
    padding: 16px 0 16px 20px;
    border-left: 2px solid var(--pay-accent);
  }

  .capsos-payment-hero__security > i {
    margin-top: 2px;
    color: var(--pay-accent);
    font-size: 1.25rem;
  }

  .capsos-payment-hero__security strong,
  .capsos-payment-hero__security span { display: block; }
  .capsos-payment-hero__security strong { margin-bottom: 4px; font-size: .9rem; }
  .capsos-payment-hero__security span { color: var(--pay-muted); font-size: .8rem; line-height: 1.5; }

  .capsos-payment-content { padding: 0 0 72px; }

  .capsos-payment-stepper {
    position: relative;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 8px;
    margin: -42px 0 26px;
    padding: 17px 20px;
    border: 1px solid var(--pay-border);
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 8px 24px rgba(23, 36, 45, .06);
  }

  .capsos-payment-stepper__line {
    position: absolute;
    top: 34px;
    left: calc(8.33% + 13px);
    right: calc(8.33% + 13px);
    height: 2px;
    border-radius: 999px;
    background: #e8edef;
    overflow: hidden;
  }

  .capsos-payment-stepper__line span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--pay-accent);
    transition: width .3s ease;
  }

  .capsos-pay-step {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    color: #9aa6ad;
    text-align: center;
  }

  .capsos-pay-step__circle {
    display: inline-flex;
    width: 34px;
    height: 34px;
    align-items: center;
    justify-content: center;
    border: 2px solid #e3e9ec;
    border-radius: 50%;
    color: #87959d;
    background: #fff;
    font-size: .75rem;
    font-weight: 800;
  }

  .capsos-pay-step__label { font-size: .7rem; font-weight: 700; }
  .capsos-pay-step.active { color: var(--pay-primary); }
  .capsos-pay-step.active .capsos-pay-step__circle {
    border-color: var(--pay-accent);
    color: var(--pay-primary);
    box-shadow: 0 0 0 4px rgba(14,165,183,.08);
  }
  .capsos-pay-step.completed { color: var(--pay-success); }
  .capsos-pay-step.completed .capsos-pay-step__circle {
    border-color: var(--pay-success);
    color: #fff;
    background: var(--pay-success);
  }

  .capsos-payment-alert {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
    padding: 13px 15px;
    border: 1px solid #efcbc7;
    border-radius: 11px;
    color: #8b3029;
    background: #fff8f7;
    font-size: .86rem;
    font-weight: 650;
  }

  .capsos-payment-card,
  .capsos-tracking-panel {
    border: 1px solid var(--pay-border);
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 7px 22px rgba(23,36,45,.045);
  }

  .capsos-payment-card { padding: clamp(22px, 4vw, 34px); }
  .capsos-payment-card__header { display: flex; gap: 14px; margin-bottom: 26px; }

  .capsos-payment-card__icon {
    display: inline-flex;
    width: 44px;
    height: 44px;
    flex: 0 0 44px;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    color: var(--pay-primary);
    background: #edf5f7;
    font-size: 1rem;
  }

  .capsos-payment-card h2 {
    margin: 0 0 6px;
    font-size: clamp(1.35rem, 2.5vw, 1.8rem);
    line-height: 1.2;
    letter-spacing: -.02em;
    font-weight: 780;
  }

  .capsos-payment-card__header p { margin: 0; color: var(--pay-muted); line-height: 1.55; font-size: .9rem; }

  .capsos-payment-form label,
  .capsos-confirmation-form label {
    display: block;
    margin-bottom: 7px;
    font-size: .82rem;
    font-weight: 700;
  }

  .capsos-payment-input-group {
    display: flex;
    align-items: center;
    overflow: hidden;
    border: 1px solid var(--pay-border);
    border-radius: 11px;
    background: #fff;
    transition: border-color .2s ease, box-shadow .2s ease;
  }

  .capsos-payment-input-group:focus-within {
    border-color: var(--pay-accent);
    box-shadow: 0 0 0 3px rgba(14,165,183,.09);
  }

  .capsos-payment-input-group > span { padding: 0 14px; color: #78909b; }
  .capsos-payment-input-group input { flex: 1; min-width: 0; padding: 14px 14px 14px 0; border: 0; outline: 0; font-size: .96rem; }

  .capsos-demo-data {
    margin: 14px 0 22px;
    padding: 12px 14px;
    border: 1px solid #e5ecef;
    border-radius: 10px;
    color: var(--pay-muted);
    background: var(--pay-soft);
    font-size: .78rem;
    line-height: 1.5;
  }

  .capsos-demo-data strong { display: block; color: #4e626d; font-size: .76rem; }
  .capsos-demo-data button { display: none; }

  .capsos-payment-primary-button,
  .capsos-payment-secondary-button {
    display: inline-flex;
    min-height: 46px;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 11px 18px;
    border-radius: 10px;
    font-size: .87rem;
    font-weight: 750;
    transition: background .2s ease, border-color .2s ease, color .2s ease, transform .2s ease;
  }

  .capsos-payment-primary-button {
    border: 1px solid var(--pay-primary);
    color: #fff;
    background: var(--pay-primary);
  }

  .capsos-payment-primary-button:hover:not(:disabled) {
    border-color: var(--pay-primary-hover);
    background: var(--pay-primary-hover);
    transform: translateY(-1px);
  }

  .capsos-payment-secondary-button {
    border: 1px solid var(--pay-border);
    color: #435661;
    background: #fff;
  }

  .capsos-payment-secondary-button:hover:not(:disabled) { border-color: #bac8cf; background: var(--pay-soft); }
  .capsos-payment-primary-button:disabled,
  .capsos-payment-secondary-button:disabled { cursor: not-allowed; opacity: .58; }
  .capsos-full-button { width: 100%; }
  .capsos-danger-button { color: var(--pay-danger); }

  .capsos-payment-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 26px;
    padding-top: 22px;
    border-top: 1px solid #edf1f3;
  }

  .capsos-invoice-summary { overflow: hidden; border: 1px solid var(--pay-border); border-radius: 13px; }
  .capsos-invoice-summary__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    padding: 19px;
    background: var(--pay-soft);
  }

  .capsos-invoice-summary__top span,
  .capsos-invoice-summary__top strong,
  .capsos-invoice-summary__top small { display: block; }
  .capsos-invoice-summary__top > div > span { margin-bottom: 4px; color: var(--pay-muted); font-size: .68rem; font-weight: 800; text-transform: uppercase; }
  .capsos-invoice-summary__top > div > strong { margin-bottom: 3px; color: var(--pay-primary); font-size: 1.08rem; }
  .capsos-invoice-summary__top > div > small { color: var(--pay-muted); font-size: .8rem; }

  .capsos-status-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 9px;
    border-radius: 999px;
    font-size: .68rem;
    font-weight: 800;
    white-space: nowrap;
  }
  .capsos-status-pill.pending { color: #7a5b00; background: #fff7d8; }
  .capsos-status-pill.connected { color: #146846; background: #e8f7ef; }

  .capsos-invoice-grid,
  .capsos-result-grid,
  .capsos-bank-transaction-box,
  .capsos-bank-simulator__payment {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .capsos-invoice-grid > div,
  .capsos-result-grid > div,
  .capsos-bank-transaction-box > div,
  .capsos-bank-simulator__payment > div {
    padding: 15px 18px;
    border-right: 1px solid #edf1f3;
    border-bottom: 1px solid #edf1f3;
  }

  .capsos-invoice-grid > div:nth-child(2n),
  .capsos-result-grid > div:nth-child(2n),
  .capsos-bank-transaction-box > div:nth-child(2n),
  .capsos-bank-simulator__payment > div:nth-child(2n) { border-right: 0; }

  .capsos-invoice-grid span,
  .capsos-invoice-grid strong,
  .capsos-result-grid span,
  .capsos-result-grid strong,
  .capsos-bank-transaction-box span,
  .capsos-bank-transaction-box strong,
  .capsos-bank-simulator__payment span,
  .capsos-bank-simulator__payment strong { display: block; overflow-wrap: anywhere; }

  .capsos-invoice-grid span,
  .capsos-result-grid span,
  .capsos-bank-transaction-box span,
  .capsos-bank-simulator__payment span {
    margin-bottom: 4px;
    color: var(--pay-muted);
    font-size: .67rem;
    font-weight: 750;
    text-transform: uppercase;
  }

  .capsos-invoice-grid strong,
  .capsos-result-grid strong,
  .capsos-bank-transaction-box strong,
  .capsos-bank-simulator__payment strong { font-size: .84rem; }

  .capsos-invoice-total {
    padding: 20px 22px;
    color: var(--pay-text);
    background: #fff;
    text-align: right;
  }

  .capsos-invoice-total span,
  .capsos-invoice-total strong,
  .capsos-invoice-total small { display: block; }
  .capsos-invoice-total span { color: var(--pay-muted); font-size: .68rem; font-weight: 800; text-transform: uppercase; }
  .capsos-invoice-total strong { margin: 4px 0; color: var(--pay-primary); font-size: 1.85rem; }
  .capsos-invoice-total small { color: var(--pay-muted); font-size: .75rem; }

  .capsos-payment-methods { display: grid; gap: 11px; }
  .capsos-method-card {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 14px;
    align-items: center;
    padding: 15px;
    border: 1px solid var(--pay-border);
    border-radius: 12px;
    cursor: pointer;
    transition: .2s ease;
  }

  .capsos-method-card:hover { border-color: #b7ccd4; background: #fbfcfc; }
  .capsos-method-card.selected { border-color: var(--pay-accent); background: #f5fbfc; box-shadow: 0 0 0 3px rgba(14,165,183,.07); }
  .capsos-method-card input { position: absolute; opacity: 0; pointer-events: none; }
  .capsos-method-card__icon {
    display: inline-flex;
    width: 42px;
    height: 42px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    color: var(--pay-primary);
    background: #edf5f7;
  }
  .capsos-method-card__content > * { display: block; }
  .capsos-method-card__content strong { margin: 3px 0; font-size: .9rem; }
  .capsos-method-card__content small { color: var(--pay-muted); font-size: .78rem; line-height: 1.45; }
  .capsos-method-card__badge { color: var(--pay-accent); font-size: .62rem; font-weight: 800; text-transform: uppercase; }
  .capsos-method-card__check { color: #cbd5da; }
  .capsos-method-card.selected .capsos-method-card__check { color: var(--pay-success); }

  .capsos-security-note,
  .capsos-bank-warning,
  .capsos-bank-simulator__notice {
    display: flex;
    gap: 12px;
    margin-top: 18px;
    padding: 13px 14px;
    border: 1px solid #deebee;
    border-radius: 10px;
    color: #49626d;
    background: #f7fafb;
  }

  .capsos-security-note i,
  .capsos-bank-warning i,
  .capsos-bank-simulator__notice i { margin-top: 2px; color: var(--pay-accent); }
  .capsos-security-note strong,
  .capsos-security-note p,
  .capsos-bank-warning strong,
  .capsos-bank-warning p { display: block; }
  .capsos-security-note p,
  .capsos-bank-warning p,
  .capsos-bank-simulator__notice p { margin: 3px 0 0; font-size: .78rem; line-height: 1.5; }

  .capsos-confirmation-layout { display: grid; grid-template-columns: minmax(0, 1fr) 290px; gap: 20px; }
  .capsos-confirmation-form input[type='email'],
  .capsos-confirmation-form input[type='tel'] {
    width: 100%;
    margin-bottom: 15px;
    padding: 12px 13px;
    border: 1px solid var(--pay-border);
    border-radius: 10px;
    outline: 0;
  }
  .capsos-confirmation-form input:focus { border-color: var(--pay-accent); box-shadow: 0 0 0 3px rgba(14,165,183,.08); }

  .capsos-payment-consent {
    display: flex !important;
    gap: 10px;
    align-items: flex-start;
    margin-top: 2px;
    padding: 12px;
    border: 1px solid #e6ecef;
    border-radius: 10px;
    background: var(--pay-soft);
    font-weight: 500 !important;
    font-size: .78rem !important;
    line-height: 1.5;
  }
  .capsos-payment-consent input { margin-top: 3px; }

  .capsos-payment-order {
    padding: 18px;
    border: 1px solid var(--pay-border);
    border-radius: 12px;
    background: #fff;
  }
  .capsos-payment-order > span { color: var(--pay-muted); font-size: .65rem; font-weight: 800; text-transform: uppercase; }
  .capsos-payment-order > strong { display: block; margin: 5px 0 14px; color: var(--pay-primary); }
  .capsos-payment-order > div { display: flex; justify-content: space-between; gap: 12px; padding: 9px 0; border-bottom: 1px solid #edf1f3; font-size: .79rem; }
  .capsos-payment-order > div span { color: var(--pay-muted); }
  .capsos-payment-order__total { margin-top: 5px; border-bottom: 0 !important; font-size: .94rem !important; }
  .capsos-payment-order__total strong { color: var(--pay-primary); }

  .capsos-processing-box {
    display: flex;
    align-items: center;
    gap: 13px;
    margin-top: 18px;
    padding: 14px;
    border: 1px solid #deebee;
    border-radius: 10px;
    background: #f6fafb;
  }
  .capsos-processing-box strong,
  .capsos-processing-box p { display: block; }
  .capsos-processing-box p { margin: 2px 0 0; color: var(--pay-muted); font-size: .77rem; }

  .capsos-spinner,
  .capsos-button-spinner { display: inline-block; border-radius: 50%; animation: capsosSpin .8s linear infinite; }
  .capsos-spinner { width: 26px; height: 26px; border: 3px solid #d7e6e9; border-top-color: var(--pay-accent); }
  .capsos-button-spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; }
  @keyframes capsosSpin { to { transform: rotate(360deg); } }

  .capsos-bank-handoff__route {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr;
    gap: 11px;
    align-items: center;
    margin-bottom: 20px;
    padding: 17px;
    border: 1px solid #e7edef;
    border-radius: 12px;
    background: var(--pay-soft);
  }
  .capsos-bank-handoff__route > div { text-align: center; }
  .capsos-bank-handoff__route strong,
  .capsos-bank-handoff__route small { display: block; }
  .capsos-bank-handoff__route strong { margin: 6px 0 2px; font-size: .78rem; }
  .capsos-bank-handoff__route small { color: var(--pay-muted); font-size: .67rem; }
  .capsos-route-logo { display: inline-flex; width: 44px; height: 44px; align-items: center; justify-content: center; border-radius: 11px; font-size: 1rem; }
  .capsos-route-logo--capsos { color: #fff; background: var(--pay-primary); }
  .capsos-route-logo--gateway { color: #fff; background: var(--pay-accent); }
  .capsos-route-logo--bank { color: #1f1f1f; background: #ffd400; }
  .capsos-route-line { color: #8da4ae; }
  .capsos-bank-transaction-box { overflow: hidden; margin-bottom: 18px; border: 1px solid var(--pay-border); border-radius: 12px; }
  .capsos-bank-warning { margin-bottom: 18px; border-color: #eee1b8; color: #6a5417; background: #fffbef; }
  .capsos-bank-warning i { color: #a97700; }

  .capsos-bank-simulator { overflow: hidden; border: 1px solid #ded8b4; border-radius: 13px; background: #fff; }
  .capsos-bank-simulator__header { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 17px; color: #202020; background: #ffd400; }
  .capsos-bank-simulator__header > div { display: flex; align-items: center; gap: 11px; }
  .capsos-bank-simulator__logo { display: inline-flex; width: 39px; height: 39px; align-items: center; justify-content: center; border-radius: 9px; color: #ffd400; background: #202020; }
  .capsos-bank-simulator__header span,
  .capsos-bank-simulator__header strong { display: block; }
  .capsos-bank-simulator__header > div > div > span { font-size: .6rem; font-weight: 900; letter-spacing: .08em; }
  .capsos-bank-simulator__header strong { font-size: .86rem; }
  .capsos-bank-simulator__notice { margin: 17px; }
  .capsos-bank-simulator__payment { margin: 0 17px 17px; overflow: hidden; border: 1px solid var(--pay-border); border-radius: 11px; }
  .capsos-bank-simulator__buttons { display: flex; justify-content: flex-end; gap: 10px; padding: 0 17px 17px; }

  .capsos-payment-result { padding: 25px; border: 1px solid transparent; border-radius: 13px; text-align: center; }
  .capsos-payment-result.approved { border-color: #cfe8dc; color: #155e42; background: #f2fbf6; }
  .capsos-payment-result.declined { border-color: #efd2ce; color: #8a3129; background: #fff7f6; }
  .capsos-payment-result__icon { display: inline-flex; margin-bottom: 8px; font-size: 2.6rem; }
  .capsos-payment-result h2 { margin-bottom: 8px; }
  .capsos-payment-result p { max-width: 610px; margin: 0 auto; font-size: .88rem; line-height: 1.6; }
  .capsos-result-reference { margin-top: 17px; padding: 12px; border: 1px dashed currentColor; border-radius: 9px; background: rgba(255,255,255,.6); }
  .capsos-result-reference span,
  .capsos-result-reference strong { display: block; overflow-wrap: anywhere; }
  .capsos-result-reference span { margin-bottom: 4px; font-size: .65rem; font-weight: 800; text-transform: uppercase; }
  .capsos-result-grid { overflow: hidden; margin-top: 18px; border: 1px solid var(--pay-border); border-radius: 12px; }

  .capsos-tracking-panel { position: sticky; top: 18px; overflow: hidden; }
  .capsos-tracking-panel__header {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 17px 18px;
    border-bottom: 1px solid var(--pay-border);
    color: var(--pay-text);
    background: #fff;
  }
  .capsos-tracking-panel__header > span { display: inline-flex; width: 36px; height: 36px; align-items: center; justify-content: center; border-radius: 9px; color: var(--pay-primary); background: #edf5f7; }
  .capsos-tracking-panel__header strong,
  .capsos-tracking-panel__header small { display: block; }
  .capsos-tracking-panel__header strong { font-size: .86rem; }
  .capsos-tracking-panel__header small { margin-top: 2px; color: var(--pay-muted); font-size: .7rem; }

  .capsos-tracking-list { padding: 18px; }
  .capsos-tracking-item { position: relative; display: flex; gap: 11px; padding-bottom: 18px; color: #95a1a7; }
  .capsos-tracking-item:last-child { padding-bottom: 0; }
  .capsos-tracking-item:not(:last-child)::after { content: ''; position: absolute; top: 30px; left: 14px; width: 1px; height: calc(100% - 19px); background: #e5eaed; }
  .capsos-tracking-icon { position: relative; z-index: 1; display: inline-flex; width: 29px; height: 29px; flex: 0 0 29px; align-items: center; justify-content: center; border: 1px solid #dfe6ea; border-radius: 50%; background: #fff; font-size: .67rem; }
  .capsos-tracking-item strong,
  .capsos-tracking-item span { display: block; }
  .capsos-tracking-item strong { color: var(--pay-text); font-size: .78rem; }
  .capsos-tracking-item span { margin-top: 2px; font-size: .68rem; line-height: 1.35; overflow-wrap: anywhere; }
  .capsos-tracking-item.active .capsos-tracking-icon { border-color: var(--pay-accent); color: var(--pay-accent); }
  .capsos-tracking-item.completed .capsos-tracking-icon { border-color: var(--pay-success); color: #fff; background: var(--pay-success); }
  .capsos-tracking-item.failed .capsos-tracking-icon { border-color: var(--pay-danger); color: #fff; background: var(--pay-danger); }

  .capsos-technical-preview { margin: 0 18px 18px; border: 1px solid var(--pay-border); border-radius: 10px; background: #fafbfb; }
  .capsos-technical-preview summary { padding: 11px 12px; color: #526a75; font-size: .72rem; font-weight: 750; cursor: pointer; }
  .capsos-technical-preview summary i { margin-right: 7px; }
  .capsos-technical-preview pre { max-height: 300px; margin: 0; padding: 12px; overflow: auto; border-top: 1px solid var(--pay-border); color: #dceff3; background: #17303d; font-size: .66rem; }

  .capsos-tracking-help { display: flex; gap: 10px; margin: 0 18px 18px; padding: 13px; border-top: 1px solid #edf1f3; color: var(--pay-muted); }
  .capsos-tracking-help > i { color: var(--pay-accent); }
  .capsos-tracking-help strong,
  .capsos-tracking-help span,
  .capsos-tracking-help a { display: block; }
  .capsos-tracking-help strong { color: var(--pay-text); font-size: .76rem; }
  .capsos-tracking-help span,
  .capsos-tracking-help a { margin-top: 2px; font-size: .68rem; }

  @media (max-width: 1199.98px) {
    .capsos-tracking-panel { position: static; }
  }

  @media (max-width: 767.98px) {
    .capsos-payment-page { padding-top: 72px; }
    .capsos-payment-hero { padding: 34px 0 72px; }
    .capsos-payment-hero__security { margin-top: 6px; padding-left: 15px; }
    .capsos-payment-stepper { grid-template-columns: repeat(3, 1fr); gap: 15px 6px; margin-top: -36px; padding: 15px 10px; }
    .capsos-payment-stepper__line { display: none; }
    .capsos-pay-step__circle { width: 31px; height: 31px; }
    .capsos-pay-step__label { font-size: .64rem; }
    .capsos-confirmation-layout { grid-template-columns: 1fr; }
    .capsos-payment-actions,
    .capsos-bank-simulator__buttons { flex-direction: column-reverse; }
    .capsos-payment-actions button,
    .capsos-bank-simulator__buttons button { width: 100%; }
    .capsos-bank-handoff__route { grid-template-columns: 1fr; }
    .capsos-route-line { transform: rotate(90deg); text-align: center; }
  }

  @media (max-width: 575.98px) {
    .capsos-payment-content { padding-bottom: 45px; }
    .capsos-payment-card { padding: 18px; border-radius: 13px; }
    .capsos-payment-card__header { gap: 11px; }
    .capsos-payment-card__icon { width: 40px; height: 40px; flex-basis: 40px; border-radius: 10px; }
    .capsos-invoice-grid,
    .capsos-result-grid,
    .capsos-bank-transaction-box,
    .capsos-bank-simulator__payment { grid-template-columns: 1fr; }
    .capsos-invoice-grid > div,
    .capsos-result-grid > div,
    .capsos-bank-transaction-box > div,
    .capsos-bank-simulator__payment > div { border-right: 0; }
    .capsos-invoice-summary__top,
    .capsos-bank-simulator__header { align-items: flex-start; flex-direction: column; }
    .capsos-method-card { grid-template-columns: auto 1fr; }
    .capsos-method-card__check { display: none; }
    .capsos-simulation-badge { border-radius: 9px; line-height: 1.35; }
  }

  @media (max-width: 575.98px) {
    .capsos-processing-modal {
      padding: 16px;
    }

    .capsos-processing-modal__card {
      padding: 25px 20px 22px;
      border-radius: 15px;
    }

    .capsos-processing-modal__spinner {
      width: 68px;
      height: 68px;
    }

    .capsos-processing-modal__card h3 {
      font-size: 1.15rem;
    }
  }

  @media print {
    .capsos-payment-hero,
    .capsos-payment-stepper,
    .capsos-tracking-panel,
    .capsos-payment-actions,
    .capsos-simulation-badge { display: none !important; }
    .capsos-payment-page,
    .capsos-payment-content { padding: 0; background: #fff; }
    .capsos-payment-card { border: 0; box-shadow: none; }
  }
`;

export default PagoEnLinea;