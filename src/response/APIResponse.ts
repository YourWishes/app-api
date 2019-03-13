// Copyright (c) 2019 Dominic Masters
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

//These are standard HTTP Status codes, however they should be treated as such...
//The constants should be used wherever possible.
export const RESPONSE_OK = 200;               //Response is okay, processing happened fine
export const RESPONSE_CREATED = 201;          //Resource was created successfully
export const RESPONSE_ACCEPTED = 202;         //Request was accepted, but nothing of note to return
export const RESPONSE_NO_CONTENT = 204;       //Request was processed but there was nothing to return

export const RESPONSE_BAD_REQUEST = 400;      //Request is bad, generally caused by bad data
export const RESPONSE_UNAUTHORIZED = 401;     //Request was unauthorized but authorization is required
export const RESPONSE_FORBIDDEN = 403;        //Request may be authorized but the resource requested is forbidden
export const RESPONSE_NOT_FOUND = 404;        //Request was not found, generall caused by invalid request
export const RESPONSE_CONFLICT = 409;         //Request caused a conflict with something, generally trying to create something that already exists

export const RESPONSE_INTERNAL_ERROR = 500;   //Something went wrong in the server itself, not of fault of the client.

export interface APIResponse {
  code:number,
  data:any
}
