-- CRITICAL SECURITY FIX: Prevent unauthorized role assignment
-- This is a critical vulnerability - anyone could make themselves admin!

-- Deny all INSERT/UPDATE/DELETE on user_roles for non-admins
-- Only existing admins can manage roles

CREATE POLICY "Only admins can insert roles" 
ON public.user_roles 
FOR INSERT 
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update roles" 
ON public.user_roles 
FOR UPDATE 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete roles" 
ON public.user_roles 
FOR DELETE 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));