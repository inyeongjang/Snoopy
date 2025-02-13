const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};

exports.verifyToken = (req, res, next) => {
    try {
        res.locals.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') { // 유효기간 초과
        return res.status(419).json({
            code: 419,
            message: '토큰이 만료되었습니다',
        });
        }
        return res.status(401).json({
        code: 401,
        message: '유효하지 않은 토큰입니다',
        });
    }
};

// apiLimiter 미들웨어 : 라우터에 사용량 제한이 걸린다. 
exports.apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 기준 시간, 1분
    max: 1, 			 // 허용 횟수, 1분에 한 번 호출 가능
    handler(req, res) {	 // 제한 초과 시 콜백 함수 
    	// 사용량 제한을 초과하면 429 상태코드와 허용량 초과했다는 응답 전송
        res.status(this.statusCode).json({
        code: this.statusCode, // 기본값 429
        message: '1분에 열 번만 요청할 수 있습니다.',
        });
    },
});

// deprecated 미들웨어 : 사용하면 안 되는 라우터에 붙인다. 
exports.deprecated = (req, res) => {
    res.status(410).json({
    	// 410 코드와 새로운 버전을 사용하라는 메시지 응답 
        code: 410,
        message: '새로운 버전이 나왔습니다. 새로운 버전을 사용하세요.',
    });
};