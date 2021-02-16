import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Typography, Form } from 'antd';

import MainInput from '../../Components/Common/MainInput';
import MainButton from '../../Components/Common/MainButton';

import './style.css';

const { Title } = Typography;

const LoginPage = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row id="Login-container">
      <Col id="container" span={12}>
        <Form
          id="form-container"
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Title id="title" level={1}>
            روضتـــي
          </Title>
          <Title level={1} style={{ marginTop: 0, color: '#5A5A5A' }}>
            مرحبا بعودتك
          </Title>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: ' الرجاء إدخال البريد الإلكتروني الخاص بك!',
              },
              {
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'هذا البريد الإلكتروني غير صالح !',
              },
            ]}
          >
            <MainInput
              type="text"
              textLabel="البريد الإلكتروني"
              placeholder="example@example.com"
              width="470px"
              height="60px"
              id="input"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: ' الرجاء إدخال كلمة المرور الخاصة بك!',
              },
              {
                min: 8,
                message: 'كلمت المرور يجب أن تكون أكبر من 8 أحرف !',
              },
            ]}
          >
            <MainInput
              type="password"
              textLabel="كلمة المرور"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              width="470px"
              height="60px"
              id="input"
            />
          </Form.Item>
          <MainButton id="login-btn" width="470px" height="55px">
            تسجيل الدخول
          </MainButton>
          <div className="sign-up">
            <NavLink className="sign-up-link" to="/sign-up">
              إنشاء حساب جديد
            </NavLink>
          </div>
        </Form>
      </Col>
      <Col id="left-image" span={12} />
    </Row>
  );
};

export default LoginPage;
