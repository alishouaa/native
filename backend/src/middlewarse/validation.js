export const SaveUser = (req,res) => {
    req.checkBody('name')
    .notEmpty()
    .withMessage('الاسم المطلوب');

    req.checkBody('email')
    .notEmpty()
    .withMessage('البريد الالكتروني المطلوب');

    req.checkBody('email')
    .notEmpty()
    .withMessage('صيغة البريد الالكتروني غير صحيحة');

    req.checkBody('password')
    .notEmpty()
    .withMessage('كلمة المرور المطلوبة');

    req.checkBody('userType')
    .notEmpty()
    .withMessage('نوع المستخدم المطلوب');

};