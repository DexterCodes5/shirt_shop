package dev.dex.springbootshirtshop.service;

import org.slf4j.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.mail.*;
import org.springframework.mail.javamail.*;
import org.springframework.stereotype.*;

@Service
public class MailService {
    private final JavaMailSender javaMailSender;
    @Value("${shirt-shop.email}")
    private String shirtShopEmail;
    private static final Logger LOG = LoggerFactory.getLogger(MailService.class);

    @Autowired
    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendMail(String to, String title, String text) {
        System.out.println(shirtShopEmail);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(shirtShopEmail);
        message.setTo(to);
        message.setSubject(title);
        message.setText(text);
        javaMailSender.send(message);
        LOG.info("MailService", "Email sent");
    }
}
