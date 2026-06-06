import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Upload, X, Check } from 'lucide-react';

export function FloatingInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  placeholder,
  className = '',
  icon: Icon,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const isActive = isFocused || value?.length > 0;
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          relative border-2 rounded-xl transition-all duration-200
          ${error ? 'border-red-500 bg-red-50' : isFocused ? 'border-amber-500 bg-white' : 'border-slate-200 bg-slate-50'}
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        `}
      >
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon className="w-5 h-5" />
          </div>
        )}

        <label
          className={`
            absolute left-3 transition-all duration-200 pointer-events-none
            ${Icon ? 'left-11' : 'left-3'}
            ${isActive
              ? 'top-1 text-[10px] font-semibold text-amber-600 uppercase tracking-wider'
              : 'top-1/2 -translate-y-1/2 text-sm text-slate-400'
            }
            ${error ? 'text-red-500' : ''}
          `}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>

        <input
          ref={inputRef}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          disabled={disabled}
          placeholder={isActive ? placeholder : ''}
          className={`
            w-full bg-transparent pt-5 pb-2 px-3 text-sm text-slate-900
            ${Icon ? 'pl-11' : 'pl-3'}
            ${type === 'password' ? 'pr-10' : 'pr-3'}
            focus:outline-none
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
          {...props}
        />

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-red-500 mt-1 ml-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FloatingTextarea({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  rows = 4,
  className = '',
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  const isActive = isFocused || value?.length > 0;

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          relative border-2 rounded-xl transition-all duration-200
          ${error ? 'border-red-500 bg-red-50' : isFocused ? 'border-amber-500 bg-white' : 'border-slate-200 bg-slate-50'}
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        `}
      >
        <label
          className={`
            absolute left-3 transition-all duration-200 pointer-events-none
            ${isActive
              ? 'top-1 text-[10px] font-semibold text-amber-600 uppercase tracking-wider'
              : 'top-3 text-sm text-slate-400'
            }
            ${error ? 'text-red-500' : ''}
          `}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>

        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          disabled={disabled}
          rows={rows}
          className={`
            w-full bg-transparent pt-5 pb-2 px-3 text-sm text-slate-900
            focus:outline-none resize-none
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
          {...props}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-red-500 mt-1 ml-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FileDropzone({
  label,
  onFileSelect,
  accept = '.pdf,.jpg,.jpeg,.png,.svg,.ai,.eps',
  maxSize = 10 * 1024 * 1024, // 10MB
  error,
  className = '',
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const inputRef = useRef(null);

  const validateFile = (file) => {
    if (file.size > maxSize) {
      return `File size must be under ${(maxSize / 1024 / 1024).toFixed(0)}MB`;
    }
    const validTypes = accept.split(',').map(t => t.trim().replace('.', ''));
    const ext = file.name.split('.').pop().toLowerCase();
    if (!validTypes.includes(ext)) {
      return `Only ${accept} files are allowed`;
    }
    return null;
  };

  const handleFile = (file) => {
    const err = validateFile(file);
    if (err) {
      setFileError(err);
      return;
    }
    setFileError(null);
    setSelectedFile(file);
    onFileSelect?.(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setFileError(null);
    onFileSelect?.(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onClick={() => inputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-xl p-6 cursor-pointer
          transition-all duration-200 text-center
          ${isDragOver ? 'border-amber-500 bg-amber-50' : 'border-slate-300 bg-slate-50 hover:border-slate-400'}
          ${error || fileError ? 'border-red-500 bg-red-50' : ''}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {selectedFile ? (
            <motion.div
              key="file"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-slate-900 truncate max-w-[200px]">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-slate-500">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); clearFile(); }}
                className="p-1 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600 font-medium">
                Drop your file here or click to browse
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Supports: {accept} (Max {(maxSize / 1024 / 1024).toFixed(0)}MB)
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {(error || fileError) && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-red-500 mt-1"
          >
            {error || fileError}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
  disabled = false,
  className = '',
  placeholder = 'Select an option',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <label className="block text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          relative border-2 rounded-xl px-3 py-2.5 cursor-pointer
          transition-all duration-200
          ${error ? 'border-red-500 bg-red-50' : isFocused || isOpen ? 'border-amber-500 bg-white' : 'border-slate-200 bg-slate-50'}
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        `}
      >
        <div className="flex items-center justify-between">
          <span className={`text-sm ${selectedOption ? 'text-slate-900' : 'text-slate-400'}`}>
            {selectedOption?.label || placeholder}
          </span>
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-auto"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange({ target: { name, value: option.value } });
                  setIsOpen(false);
                }}
                className={`
                  px-3 py-2.5 text-sm cursor-pointer transition-colors
                  ${value === option.value ? 'bg-amber-50 text-amber-700 font-medium' : 'text-slate-700 hover:bg-slate-50'}
                `}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-red-500 mt-1 ml-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
