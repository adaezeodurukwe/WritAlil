import '@babel/polyfill/noConflict';
import Authenticate from '../authenticate';

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const next = jest.fn();

describe('User authentication', () => {
  it('Should return unauthorized when no token is present', async () => {
    const req = {
      headers: {
        authorization: ''
      }
    };
    const res = mockResponse();
    await Authenticate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('Should throw an error', async () => {
    const req = {
      headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJubyI6MSwiZW1haWwiOiJkYWl6eUBnbWFpbC5jb20iLCJpYXQiOjE1Nzc0ODUwODJ9.P55KHSPKLJqrU6fJ910uWa5A7p_X5effhRtJQm8RVec'
      }
    };
    const res = mockResponse();
    await Authenticate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });
});
