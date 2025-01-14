package com.th.dto;

import com.th.entity.Vendor.Status;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VendorDTO extends BaseDTO {
    private String companyName;
    private String email;
    //private String password;
    private String phone;
    private String gstin;
    private String companyOwnerName;
    private String ownerAadharNumber;
    private String panNumber;
    private String city;
    private String amount;
    private Status status;
    
   
}
