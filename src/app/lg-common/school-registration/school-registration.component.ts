import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
      amount: new FormControl('')
    });

    //this.invokeStripe(); // use when enable stripe
  }

  makePayment(amount: number, pkgId: number) {
    this.courseProviderDetailsForm.patchValue({
      packageId: pkgId,
      amount: amount
    })
    console.log(this.courseProviderDetailsForm.value)
    // this.courseProviderServie.testMethod().subscribe(data=>{
    //   console.log(data)
    // })
    this.courseProviderServie.registerCourseProvider(this.courseProviderDetailsForm.value).subscribe(data => {
      console.log(data), (error: any) => console.log(error)
      if (data) {
        this.showSuccessSnackbar("Your registration has been recorded!", 'close', '4000')
      } else {
        this.showErrorSnackbar("Something went wrong!", 'close', '4000');
      }
    })
  }

  makePaymentStripe(amount: number, pkgId: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51LMOp0G8pqgiypVSenTgZVEygHf0CuM3OO0I8VhU9PxMfVx5mk3AtlkXSdAT1Neh9lYivdRChKV6V2JEKiC45QlE00k1HAQvOz',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        console.log("PAYMENT DETAILS::: " + "PKG: " + pkgId + " Amount: " + amount + " Transaction Id: " + stripeToken.id)
        //alert('Stripe token generated!');
      }
    });

    paymentHandler.open({
      name: 'LearnGenix',
      description: '3 widgets',
      amount: amount * 100
    });
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
