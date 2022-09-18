import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Charge } from 'src/app/models/charge';
import { TempStudentCourseDetail } from 'src/app/models/tempstudent-coursedetail';
import { CourseProviderService } from 'src/app/services/course-provider.service';
import { CourseService } from 'src/app/services/course.service';
import { PaymentGatewayService } from 'src/app/services/payment-gateway.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-registration-payment',
  templateUrl: './student-registration-payment.component.html',
  styleUrls: ['./student-registration-payment.component.scss']
})
export class StudentRegistrationPaymentComponent implements OnInit {

  paymentHandler: any = null;
  tempStudentId: string = '';
  tempStudentCourseDetail!: TempStudentCourseDetail;
  initialPayment: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService, private studentService: StudentService, private courseProviderServie: CourseProviderService, private _snackBar: MatSnackBar, private paymentGateway: PaymentGatewayService) { }

  ngOnInit(): void {

    // get student details to an object
    this.loadCourseByTempStudentId();

    this.invokeStripe();
  }

  loadCourseByTempStudentId() {
    this.activatedRoute.params.subscribe(data => {
      this.tempStudentId = data.id
      console.log(this.tempStudentId)
    })

    if (this.tempStudentId) {
      this.courseService.getCoursesByTempStudentId(this.tempStudentId).subscribe(data => {
        console.log(data), (error: any) => console.log(error)
        if (data) {
          this.tempStudentCourseDetail = data;
          this.initialPayment = parseInt(this.tempStudentCourseDetail.cost)
        }
      })
    }
  }

  makePayment() {

    // get stu details from init object to make payment

    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51LMOp0G8pqgiypVSenTgZVEygHf0CuM3OO0I8VhU9PxMfVx5mk3AtlkXSdAT1Neh9lYivdRChKV6V2JEKiC45QlE00k1HAQvOz',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        paymentstripe(stripeToken)
      }
    });

    const paymentstripe = (stripeToken: any) => {
      this.paymentGateway.createCharge(new Charge("sandaka94@gmail.com", stripeToken.id, this.initialPayment)).subscribe((data: any) => {
        console.log(data);

        if (data.data === "success") {
          // this.success = true
          console.log("success")
        }
        else {
          // this.failure = true
        }
      });

      this.updateStatus(this.tempStudentCourseDetail);
    };

    paymentHandler.open({
      name: 'LearnGenix',
      description: 'Your Trusted Education Partner!',
      amount: this.initialPayment * 100,
      image: '/assets/lgx-logo2.png',
    });
  }

  updateStatus(tempStudentCourseDetail: TempStudentCourseDetail) {
    this.studentService.updatePaymentTempStudentStatus(tempStudentCourseDetail).subscribe(data => {
      console.log(data), (error: any) => console.log(error)
      if (data) {
        this.showSuccessSnackbar("Payment completed!", 'close', '4000')
      } else {
        this.showErrorSnackbar("Something went wrong!", 'close', '4000');
      }
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
