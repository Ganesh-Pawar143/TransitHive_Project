package com.th.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.th.dto.PaymentDTO;
import com.th.service.PaymentService;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins="*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/{id}")
    public ResponseEntity<PaymentDTO> getPaymentById(@PathVariable Long id) {
        PaymentDTO paymentDTO = paymentService.getPaymentById(id);
        if (paymentDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(paymentDTO);
    }

    @PostMapping
    public ResponseEntity<PaymentDTO> savePayment(@RequestBody PaymentDTO paymentDTO) {
        PaymentDTO savedPayment = paymentService.savePayment(paymentDTO);
        return ResponseEntity.status(201).body(savedPayment);
    }

    @GetMapping
    public ResponseEntity<List<PaymentDTO>> getAllPayments() {
        List<PaymentDTO> paymentList = paymentService.getAllPayments();
        return ResponseEntity.ok(paymentList);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<PaymentDTO> updatePaymentStatus(@PathVariable Long id, @RequestParam PaymentDTO.PaymentStatus status) {
        PaymentDTO updatedPayment = paymentService.updatePaymentStatus(id, status);
        return ResponseEntity.ok(updatedPayment);
    }
}