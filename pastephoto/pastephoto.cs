//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace pastephoto
{
    using System;
    using System.Collections.Generic;
    
    public partial class pastephoto
    {
        public int id { get; set; }
        public string guid { get; set; }
        public string settings { get; set; }
        public Nullable<System.DateTime> lifetime { get; set; }
    
        public virtual image image { get; set; }
    }
}
