import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Charge } from 'src/app/models/charge';
import { CourseProviderService } from 'src/app/services/course-provider.service';

@Component({
  selector: 'app-school-registration',
  templateUrl: './school-registration.component.html',
  styleUrls: ['./school-registration.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class SchoolRegistrationComponent implements OnInit {

  paymentHandler: any = null;
  courseProviderDetailsForm!: FormGroup;

  // generatedToken: any;
  // paymentEmail: any;
  // paidAmount: any;

  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  // secondFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });


  constructor(private formBuilder: FormBuilder, private courseProviderServie: CourseProviderService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.courseProviderDetailsForm = this.formBuilder.group({
      fullName: new FormControl('', Validators.required),
      nationality: new FormControl('', Validators.required),
      nic: new FormControl('', Validators.required),
      addressLine1: new FormControl('', Validators.required),
      addressLine2: new FormControl('', Validators.required),
      addressLine3: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      telephone1: new FormControl('', Validators.required),
      telephone2: new FormControl(''),
      schoolName: new FormControl('', Validators.required),
      registrationNo: new FormControl('', Validators.required),
      personalEmail: new FormControl('', Validators.required),
      schoolWebsite: new FormControl(''),
      description: new FormControl(''),
      packageId: new FormControl(''),
      amount: new FormControl(''),
      generatedToken: new FormControl(''),
      paymentEmail: new FormControl(''),
      paidAmount: new FormControl(''),
      // cvc: new FormControl(''),
      // expYear: new FormControl(''),
      // expMonth: new FormControl(''),
      // cardNumber: new FormControl(''),
    });

    this.invokeStripe(); // use when enable stripe
  }

  saveCourseProvider(amount: number, pkgId: number) {
    this.courseProviderDetailsForm.patchValue({
      packageId: pkgId,
      amount: amount
    })
    console.log(this.courseProviderDetailsForm.value)
    this.courseProviderServie.registerCourseProvider(this.courseProviderDetailsForm.value).subscribe(data => {
      console.log(data), (error: any) => console.log(error)
      if (data) {
        this.showSuccessSnackbar("Your registration has been recorded!", 'close', '4000')
      } else {
        this.showErrorSnackbar("Something went wrong!", 'close', '4000');
      }
    })
  }

  // makePaymentAndSave() {
  //   console.log(this.courseProviderDetailsForm.value);

  //   (<any>window).Stripe.card.createToken({
  //     number: this.courseProviderDetailsForm.controls['cardNumber'],
  //     exp_month: this.courseProviderDetailsForm.controls['expMonth'],
  //     exp_year: this.courseProviderDetailsForm.controls['expYear'],
  //     cvc: this.courseProviderDetailsForm.controls['cvc'],
  //   }, (status: number, response: any) => {
  //     if (status === 200) {
  //       let token = response.id;
  //       console.log(token)
  //       //this.chargeCard(token);
  //     } else {
  //       console.log(response.error.message);
  //     }
  //   });
  // }

  makePayment(amount: any, pkgId: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51LMOp0G8pqgiypVSenTgZVEygHf0CuM3OO0I8VhU9PxMfVx5mk3AtlkXSdAT1Neh9lYivdRChKV6V2JEKiC45QlE00k1HAQvOz',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        console.log("PAYMENT DETAILS::: " + "PKG: " + pkgId + " Amount: " + amount + " Transaction Id: " + stripeToken.id)
        //alert('Stripe token generated!');
        // sessionStorage.setItem('stripeToken', stripeToken.id);
        // sessionStorage.setItem('stripeEmail', stripeToken.email);
        // sessionStorage.setItem('stripeAmount', amount);

        //this.chargeCard(this.paymentEmail, this.generatedToken, this.paidAmount);
        paymentstripe(stripeToken)
      }

    });

    const paymentstripe = (stripeToken: any) => {
      this.courseProviderServie.createCharge(new Charge("sandaka94@gmail.com", stripeToken.id, amount)).subscribe((data: any) => {
        console.log(data);
        
        if (data.data === "success") {
          // this.success = true
          console.log("success")
        }
        else {
          // this.failure = true
        }
      });

      this.saveCourseProvider(amount, pkgId);
    };


    // console.log(this.generatedToken)
    // if (sessionStorage.getItem('stripeToken') && sessionStorage.getItem('stripeEmail') && sessionStorage.getItem('stripeAmount')) {
    //   this.generatedToken = sessionStorage.getItem('stripeToken');
    //   this.paymentEmail = sessionStorage.getItem('stripeEmail');
    //   this.paidAmount = sessionStorage.getItem('stripeAmount');
    //   this.chargeCard(this.paymentEmail, this.generatedToken, this.paidAmount);
    // }

    paymentHandler.open({
      name: 'LearnGenix',
      description: 'Your Trusted Education Partner!',
      image:'/assets/lgx-logo2.png', 
      amount: amount * 100
    });


  }

  chargeCard(token: any, email: string, amount: any) {
    this.courseProviderServie.createCharge(new Charge(token, email, amount)).subscribe(data => {
      console.log(data)
    })
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51LMOp0G8pqgiypVSenTgZVEygHf0CuM3OO0I8VhU9PxMfVx5mk3AtlkXSdAT1Neh9lYivdRChKV6V2JEKiC45QlE00k1HAQvOz',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
            this.generatedToken = stripeToken.id;
            this.paymentEmail = stripeToken.email;
            //this.paidAmount = amount;
          }
        });
      }

      window.document.body.appendChild(script);
    }
  }

  showSuccessSnackbar(content: any, action: any, duration: any) {
    let sb = this._snackBar.open(content, action, {
      duration: duration,
      verticalPosition: "bottom", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "end", // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["success-style"]
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  showErrorSnackbar(content: any, action: any, duration: any) {
    let sb = this._snackBar.open(content, action, {
      duration: duration,
      verticalPosition: "bottom", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "end", // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["error-style"]
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

}
